/**
 * Create the first Payload admin user against Neon (run locally with direct DATABASE_URL).
 * Vercel cannot reliably open Postgres transactions; use this before logging in on /admin.
 *
 *   DATABASE_URL='postgresql://...@ep-xxx.eu-west-2.aws.neon.tech/neondb?sslmode=verify-full' \
 *   PAYLOAD_SECRET='your-secret' \
 *   node src/scripts/create-payload-first-user.mjs admin@example.com 'YourSecurePassword'
 */
import { getPayload } from 'payload';
import config from '../payload.config.js';

const email = process.argv[2]?.trim().toLowerCase();
const password = process.argv[3];

if (!email || !password) {
  console.error(
    'Usage: DATABASE_URL=<neon-direct-uri> PAYLOAD_SECRET=<secret> \\\n' +
      '  node src/scripts/create-payload-first-user.mjs <email> <password>'
  );
  process.exit(1);
}

if (!process.env.DATABASE_URL?.trim()) {
  console.error(
    'DATABASE_URL is required (use Neon direct / unpooled host from the console).'
  );
  process.exit(1);
}

if (!process.env.PAYLOAD_SECRET?.trim()) {
  console.error('PAYLOAD_SECRET is required (same value as on Vercel).');
  process.exit(1);
}

const payload = await getPayload({ config });

const { totalDocs } = await payload.count({
  collection: 'users',
  overrideAccess: true,
});

if (totalDocs > 0) {
  console.log(`Users already exist (${totalDocs}). Skipping create.`);
  process.exit(0);
}

await payload.create({
  collection: 'users',
  data: {
    email,
    password,
    role: 'master-admin',
  },
  overrideAccess: true,
});

console.log(`Created master-admin user: ${email}`);
process.exit(0);
