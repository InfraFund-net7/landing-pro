/**
 * Wake Neon compute over HTTP before Payload opens WebSocket transactions (Vercel).
 * Must not import postgres-pool-config (pulls in `pg`, breaks instrumentation bundle).
 */
import { neon } from '@neondatabase/serverless';

/** @param {string} connectionString */
function normalizeNeonWarmupUrl(connectionString) {
  try {
    const u = new URL(connectionString.trim());
    u.searchParams.delete('channel_binding');
    const sslmode = u.searchParams.get('sslmode')?.toLowerCase();
    if (
      sslmode === 'require' ||
      sslmode === 'prefer' ||
      sslmode === 'verify-ca'
    ) {
      u.searchParams.set('sslmode', 'verify-full');
    } else if (!sslmode) {
      u.searchParams.set('sslmode', 'verify-full');
    }
    return u.toString();
  } catch {
    return connectionString.trim();
  }
}

/** @param {string} connectionString */
export async function warmupNeonDatabase(connectionString) {
  const url = normalizeNeonWarmupUrl(connectionString);
  if (!url) return;
  const sql = neon(url);
  await sql`SELECT 1`;
}
