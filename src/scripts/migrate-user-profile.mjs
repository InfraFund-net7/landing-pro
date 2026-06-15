import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  console.error(
    'DATABASE_URL is required (Neon connection string from Vercel or .env.local).'
  );
  process.exit(1);
}

const dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlFile = path.join(
  dirname,
  'sql',
  'add-user-profile-and-post-author.sql'
);

const check = execFileSync(
  'psql',
  [
    databaseUrl,
    '-tAc',
    "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'payload' AND table_name = 'users');",
  ],
  { encoding: 'utf8' }
).trim();

if (check !== 't') {
  console.error(
    'payload.users does not exist on this database. Bootstrap Payload first:\n' +
      "  DATABASE_URL='...' node src/scripts/bootstrap-payload-schema.mjs"
  );
  process.exit(1);
}

console.log('Applying user profile + post author migration…');
execFileSync('psql', [databaseUrl, '-v', 'ON_ERROR_STOP=1', '-f', sqlFile], {
  stdio: 'inherit',
});
console.log('Done.');
