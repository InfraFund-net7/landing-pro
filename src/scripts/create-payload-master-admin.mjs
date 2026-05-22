/**
 * Create an additional Payload master-admin user (or set password if email exists).
 * Run locally with Neon direct DATABASE_URL — same as db:create-payload-admin.
 *
 *   DATABASE_URL='postgresql://...@ep-xxx.eu-west-2.aws.neon.tech/neondb?sslmode=verify-full' \
 *   PAYLOAD_SECRET='your-secret' \
 *   node src/scripts/create-payload-master-admin.mjs admin2@example.com 'YourSecurePassword'
 */
import { getPayload } from 'payload';
import config from '../payload.config.js';

const email = process.argv[2]?.trim().toLowerCase();
const password = process.argv[3];

if (!email || !password) {
  console.error(
    'Usage: DATABASE_URL=<neon-direct-uri> PAYLOAD_SECRET=<secret> \\\n' +
      '  node src/scripts/create-payload-master-admin.mjs <email> <password>'
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

let dbHost = '';
try {
  dbHost = new URL(process.env.DATABASE_URL).hostname;
} catch {
  /* ignore */
}

if (dbHost === '127.0.0.1' || dbHost === 'localhost') {
  console.error(
    `DATABASE_URL host is ${dbHost} — that is local Postgres, not Neon.\n` +
      'Do not use --env-file=.env.local for this script. Pass Neon direct URL on the command line.'
  );
  process.exit(1);
}

console.log(`Using database host: ${dbHost}`);

const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
  overrideAccess: true,
});

const existing = docs[0];

if (existing) {
  await payload.update({
    collection: 'users',
    id: existing.id,
    data: {
      password,
      role: 'master-admin',
    },
    overrideAccess: true,
  });
  console.log(
    `Updated existing user ${email} (id: ${existing.id}): password set, role=master-admin.`
  );
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
