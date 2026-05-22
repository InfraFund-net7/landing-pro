/**
 * Payload + Neon on Vercel: @neondatabase/serverless with poolQueryViaFetch (HTTPS).
 * node-pg TCP to Neon pooler times out from Vercel even after HTTP warmup.
 * Local Neon dev may use serverless driver; docker uses node-pg.
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

/** Neon hosts use @neondatabase/serverless (poolQueryViaFetch on Vercel — see neon-pg-setup.js). */
export function resolvePgForPayload(connectionString) {
  return isNeonDatabaseUrl(connectionString) ? neonServerless : pg;
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
 * Payload pool uses DATABASE_URL as-is (pooled on Vercel). Stripping `-pooler` for a
 * "direct" host broke RootPage db.findOne — login redirected to create-first-user.
 * @param {string} connectionString
 */
export function resolvePayloadDatabaseUrl(connectionString) {
  if (process.env.VERCEL && process.env.DATABASE_URL_UNPOOLED?.trim()) {
    return process.env.DATABASE_URL_UNPOOLED.trim();
  }
  return connectionString;
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
  const resolved = resolvePayloadDatabaseUrl(connectionString);
  const normalized = normalizePgConnectionString(resolved);
  const pool = {
    connectionString: normalized,
  };

  if (shouldSetSearchPathStartup(normalized)) {
    pool.options = '-c search_path=payload,public';
  }

  if (!isNeonDatabaseUrl(normalized)) {
    const ssl = pgSslOption(normalized);
    if (ssl) pool.ssl = ssl;
  }

  if (process.env.VERCEL) {
    pool.max = 1;
    pool.idleTimeoutMillis = 20_000;
    pool.connectionTimeoutMillis = isNeonDatabaseUrl(normalized)
      ? 30_000
      : 20_000;
  }

  return pool;
}
