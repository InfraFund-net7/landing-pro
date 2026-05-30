/**
 * Promote a Payload user to Master Admin by email.
 *
 * Usage:
 *   node --env-file=.env.local src/scripts/promote-master-admin.mjs you@example.com
 */
import { getPayload } from 'payload';
import config from '../payload.config.js';

const email = process.argv[2]?.trim().toLowerCase();

if (!email) {
  console.error(
    'Usage: node --env-file=.env.local src/scripts/promote-master-admin.mjs <email>'
  );
  process.exit(1);
}

const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
  overrideAccess: true,
});

const user = docs[0];

if (!user) {
  console.error(`No user found with email: ${email}`);
  process.exit(1);
}

await payload.update({
  collection: 'users',
  id: user.id,
  data: { role: 'master-admin' },
  overrideAccess: true,
});

console.log(
  `Promoted ${email} to master-admin (id: ${user.id}). Log out and sign in again.`
);

process.exit(0);
