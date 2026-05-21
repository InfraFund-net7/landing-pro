/**
 * Payload Postgres on Vercel + Neon: HTTP warmup then node-pg TCP (pooler).
 * WebSocket (@neondatabase/serverless Pool) hangs ~60s on Vercel after warmup succeeds.
 * Local Neon dev may use @neondatabase/serverless; docker uses node-pg.
 */

import pg from 'pg';
import * as neonServerless from '@neondatabase/serverless';

/** Modes that pg v8 warns about; map to verify-full (see node pg-connection-string). */
const PG_LEGACY_SSL_MODES = new Set(['prefer', 'require', 'verify-ca']);

/** @param {string} connectionString */
export function isNeonDatabaseUrl(connectionString) {
  try {
    return new URL(connectionString).hostname
      .toLowerCase()
      .endsWith('.neon.tech');
  } catch {
    return false;
  }
}

/** Vercel + Neon: node-pg TCP (after HTTP warmup). Other Neon: serverless driver. */
export function resolvePgForPayload(connectionString) {
  if (!isNeonDatabaseUrl(connectionString)) return pg;
  if (process.env.VERCEL) return pg;
  return neonServerless;
}

/**
 * @param {string} connectionString
 * @returns {'pooler' | 'direct' | 'other'}
 */
export function neonConnectionKind(connectionString) {
  try {
    const host = new URL(connectionString).hostname.toLowerCase();
    if (!host.endsWith('.neon.tech')) return 'other';
    return host.includes('-pooler') ? 'pooler' : 'direct';
  } catch {
    return 'other';
  }
}

/**
 * Avoid pg "SECURITY WARNING" for sslmode=require on Neon/Vercel.
 * @param {string} connectionString
 */
export function normalizePgConnectionString(connectionString) {
  try {
    const u = new URL(connectionString);
    if (u.searchParams.get('uselibpqcompat') === 'true') {
      return connectionString;
    }
    const sslmode = u.searchParams.get('sslmode')?.toLowerCase();
    if (sslmode && PG_LEGACY_SSL_MODES.has(sslmode)) {
      u.searchParams.set('sslmode', 'verify-full');
      return u.toString();
    }
    const host = u.hostname.toLowerCase();
    if (host.endsWith('.neon.tech')) {
      // Copied Neon URIs often include this; node-pg on Vercel can hang with it.
      u.searchParams.delete('channel_binding');
      if (!sslmode) u.searchParams.set('sslmode', 'verify-full');
      // Scale-to-zero wake + WebSocket connect can exceed 30s on first hit.
      const connectTimeout = process.env.VERCEL ? '60' : '60';
      u.searchParams.set('connect_timeout', connectTimeout);
      return u.toString();
    }
    return connectionString;
  } catch {
    return connectionString;
  }
}

/** @param {string} connectionString */
function needsPgSsl(connectionString) {
  if (isNeonDatabaseUrl(connectionString) && process.env.VERCEL) return true;
  if (isNeonDatabaseUrl(connectionString)) return false;
  try {
    const u = new URL(connectionString);
    const sslmode = u.searchParams.get('sslmode')?.toLowerCase();
    if (
      sslmode &&
      ['require', 'verify-ca', 'verify-full', 'prefer'].includes(sslmode)
    ) {
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}

/** @param {string} connectionString */
export function pgSslOption(connectionString) {
  return needsPgSsl(connectionString)
    ? { rejectUnauthorized: true }
    : undefined;
}

/**
 * search_path via pool.options is rejected by Neon pooler; Payload uses schemaName.
 * @param {string} connectionString
 */
function shouldSetSearchPathStartup(connectionString) {
  if (isNeonDatabaseUrl(connectionString)) return false;
  try {
    const host = new URL(connectionString).hostname.toLowerCase();
    if (host.endsWith('.neon.tech')) return false;
  } catch {
    /* ignore */
  }
  return true;
}

/** @param {string} connectionString */
export function buildPayloadPgPool(connectionString) {
  const normalized = normalizePgConnectionString(connectionString);
  const pool = {
    connectionString: normalized,
  };

  if (shouldSetSearchPathStartup(normalized)) {
    pool.options = '-c search_path=payload,public';
  }

  const ssl = pgSslOption(normalized);
  if (ssl) pool.ssl = ssl;

  if (process.env.VERCEL) {
    pool.max = 1;
    pool.idleTimeoutMillis = 20_000;
    // Stay under function maxDuration (60s); fail with DB error instead of 504-only.
    pool.connectionTimeoutMillis = isNeonDatabaseUrl(normalized)
      ? 25_000
      : 20_000;
  }

  return pool;
}
