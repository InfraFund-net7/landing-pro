/**
 * Reliable user-exists check over Neon HTTP (same as warmup). Used when Payload
 * db.findOne fails on Vercel but payload.users has rows.
 */
import { neon } from '@neondatabase/serverless';
import { resolvePayloadDatabaseUrl } from './postgres-pool-config.js';

/** @param {string} [connectionString] */
export async function probeNeonHasPayloadUser(connectionString) {
  const raw = (connectionString ?? process.env.DATABASE_URL)?.trim();
  const url = raw ? resolvePayloadDatabaseUrl(raw) : '';
  if (!url?.includes('.neon.tech')) return null;

  try {
    const sql = neon(url);
    const rows = await sql`SELECT id FROM payload.users LIMIT 1`;
    return rows.length > 0;
  } catch (err) {
    console.warn(
      '[payload] neon user probe failed:',
      err instanceof Error ? err.message : err
    );
    return null;
  }
}
