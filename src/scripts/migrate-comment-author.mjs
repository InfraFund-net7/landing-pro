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
const sqlFile = path.join(dirname, 'sql', 'add-comment-author-user.sql');

console.log('Applying comment authorUser migration…');
execFileSync('psql', [databaseUrl, '-v', 'ON_ERROR_STOP=1', '-f', sqlFile], {
  stdio: 'inherit',
});
console.log('Done.');
