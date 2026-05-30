/**
 * Check whether Payload users exist (which DB/host DATABASE_URL points at).
 *
 *   DATABASE_URL='postgresql://...@....neon.tech/neondb?sslmode=verify-full' \
 *   node src/scripts/verify-payload-users.mjs
 */
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  console.error(
    'Set DATABASE_URL (Neon direct or pooled — same project as Vercel).'
  );
  process.exit(1);
}

let host = '';
try {
  host = new URL(databaseUrl).hostname;
} catch {
  console.error('Invalid DATABASE_URL');
  process.exit(1);
}

console.log(`Database host: ${host}`);

const sql = neon(databaseUrl);

try {
  const rows = await sql`
    SELECT id, email, role
    FROM payload.users
    ORDER BY id
    LIMIT 10
  `;
  console.log(`payload.users count (up to 10): ${rows.length}`);
  for (const row of rows) {
    console.log(
      `  - id=${row.id} email=${row.email} role=${row.role ?? '(null)'}`
    );
  }
  if (rows.length === 0) {
    console.log(
      'No users in payload.users on this URL. Vercel will show create-first-user.'
    );
    process.exit(1);
  }
} catch (err) {
  console.error('Query failed:', err instanceof Error ? err.message : err);
  console.error(
    'If schema is missing, run: npm run db:bootstrap:payload with direct Neon URL'
  );
  process.exit(1);
}
