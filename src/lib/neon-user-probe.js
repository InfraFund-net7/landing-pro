/**
 * Reliable user-exists check over Neon HTTP (same as warmup). Used when Payload
 * db.findOne fails on Vercel but payload.users has rows.
 *
 * Do not import postgres-pool-config here — it pulls in `pg` → `pgpass` → `fs` and
 * breaks the instrumentation bundle (see neon-warmup.js).
 */
import { neon } from '@neondatabase/serverless';

/** @param {string} [connectionString] */
export async function probeNeonHasPayloadUser(connectionString) {
  const url = (
    connectionString ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL
  )?.trim();
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
