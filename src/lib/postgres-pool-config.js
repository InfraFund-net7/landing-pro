/**
 * Shared pg pool settings for Payload (@payloadcms/db-postgres) and scripts.
 * Neon requires SSL; Vercel serverless needs a small pool (max 1).
 */

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

/** @param {string} connectionString */
export function buildPayloadPgPool(connectionString) {
  const pool = {
    connectionString,
    options: '-c search_path=payload,public',
  };

  const ssl = pgSslOption(connectionString);
  if (ssl) pool.ssl = ssl;

  if (process.env.VERCEL) {
    pool.max = 1;
    pool.idleTimeoutMillis = 5_000;
    pool.connectionTimeoutMillis = 10_000;
  }

  return pool;
}
