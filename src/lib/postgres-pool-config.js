/**
 * Shared pg pool settings for Payload (@payloadcms/db-postgres) and scripts.
 * Neon on Vercel uses @neondatabase/serverless (WebSockets); local/docker uses pg TCP.
 */

import pg from 'pg';
import * as neonServerless from '@neondatabase/serverless';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

/** Modes that pg v8 warns about; map to verify-full (see node pg-connection-string). */
const PG_LEGACY_SSL_MODES = new Set(['prefer', 'require', 'verify-ca']);

/** @param {string} connectionString */
function isNeonDatabaseUrl(connectionString) {
  try {
    return new URL(connectionString).hostname
      .toLowerCase()
      .endsWith('.neon.tech');
  } catch {
    return false;
  }
}

/** @param {string} connectionString */
export function resolvePgForPayload(connectionString) {
  return isNeonDatabaseUrl(connectionString) ? neonServerless : pg;
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
      if (!sslmode) u.searchParams.set('sslmode', 'verify-full');
      // Neon scale-to-zero cold start can exceed 10s on first Vercel request.
      if (!u.searchParams.has('connect_timeout')) {
        u.searchParams.set('connect_timeout', '60');
      }
      return u.toString();
    }
    return connectionString;
  } catch {
    return connectionString;
  }
}

/** @param {string} connectionString */
function needsPgSsl(connectionString) {
  try {
    const u = new URL(connectionString);
    const host = u.hostname.toLowerCase();
    const sslmode = u.searchParams.get('sslmode')?.toLowerCase();
    if (host.endsWith('.neon.tech')) return true;
    if (
      sslmode &&
      ['require', 'verify-ca', 'verify-full', 'prefer'].includes(sslmode)
    ) {
      return true;
    }
  } catch {
    /* ignore invalid URL */
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
 * search_path via pool.options is rejected by Neon (pooler) and unnecessary when
 * Payload uses schemaName: 'payload'.
 * @param {string} connectionString
 */
function shouldSetSearchPathStartup(connectionString) {
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

  // Neon serverless driver uses WebSockets; ssl in pool config is for node-pg TCP only.
  if (!isNeonDatabaseUrl(normalized)) {
    const ssl = pgSslOption(normalized);
    if (ssl) pool.ssl = ssl;
  }

  if (process.env.VERCEL) {
    pool.max = 1;
    pool.idleTimeoutMillis = 20_000;
    let host = '';
    try {
      host = new URL(normalized).hostname.toLowerCase();
    } catch {
      /* ignore */
    }
    // Do not use a 10s cap on Neon — compute wake + TLS often needs longer.
    pool.connectionTimeoutMillis = host.endsWith('.neon.tech')
      ? 60_000
      : 30_000;
  }

  return pool;
}
