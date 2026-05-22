/**
 * Verify Payload admin login against the same DB URL the app uses at runtime.
 *
 *   DATABASE_URL='postgresql://...@ep-xxx-pooler....neon.tech/neondb?sslmode=verify-full' \
 *   PAYLOAD_SECRET='...' \
 *   node src/scripts/verify-payload-login.mjs your@email.com 'YourPassword'
 */
import { getPayload } from 'payload';
import config from '../payload.config.js';

const email = process.argv[2]?.trim().toLowerCase();
const password = process.argv[3];

if (!email || !password) {
  console.error(
    'Usage: DATABASE_URL=<same as Vercel> PAYLOAD_SECRET=<secret> \\\n' +
      '  node src/scripts/verify-payload-login.mjs <email> <password>'
  );
  process.exit(1);
}

if (!process.env.DATABASE_URL?.trim()) {
  console.error('DATABASE_URL is required.');
  process.exit(1);
}

if (!process.env.PAYLOAD_SECRET?.trim()) {
  console.error('PAYLOAD_SECRET is required.');
  process.exit(1);
}

let host = '';
try {
  host = new URL(process.env.DATABASE_URL).hostname;
} catch {
  console.error('Invalid DATABASE_URL');
  process.exit(1);
}

console.log(`Database host: ${host}`);

const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
  overrideAccess: true,
});

if (!docs[0]) {
  console.error(
    `No user with email ${email} in payload.users on this DATABASE_URL.`
  );
  process.exit(1);
}

console.log(`Found user id=${docs[0].id} email=${docs[0].email}`);

try {
  const result = await payload.login({
    collection: 'users',
    data: { email, password },
  });
  console.log(`Login OK — token issued for ${result.user?.email}`);
  process.exit(0);
} catch (err) {
  console.error(
    'Login failed:',
    err instanceof Error ? err.message : err,
    err?.status ? `(status ${err.status})` : ''
  );
  console.error(
    'If verify-payload-users shows this email but login fails, check password and PAYLOAD_SECRET match Vercel.'
  );
  process.exit(1);
}
