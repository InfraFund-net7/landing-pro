/**
 * Apply backpro public-schema migrations + copy landing-related data to Neon.
 *
 *   SOURCE_DATABASE_URL — backpro Postgres (local Docker infra_dev, no search_path in URL)
 *   TARGET_DATABASE_URL — Neon unpooled URL (same DB as Payload CMS)
 *
 * Example:
 *   SOURCE_DATABASE_URL='postgresql://postgres:pass@127.0.0.1:5433/infra_dev?sslmode=disable' \
 *   TARGET_DATABASE_URL='postgresql://...@....neon.tech/neondb?sslmode=require' \
 *   node src/scripts/migrate-backpro-to-neon.mjs
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const backproMigrationsDir = path.resolve(
  dirname,
  '../../../backpro/internal/infrastructure/persistence/postgres/migrations'
);

const LATEST_MIGRATION_VERSION = '20251219081000';

const DATA_TABLES = ['waitlist', 'contact_forms', 'non_resident_waitlists'];

function stripSearchPath(url) {
  const u = new URL(url);
  u.searchParams.delete('options');
  return u.toString();
}

function requireUrl(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`Missing ${name}`);
    process.exit(1);
  }
  return stripSearchPath(value);
}

function psql(url, args) {
  execFileSync('psql', [url, '-v', 'ON_ERROR_STOP=1', ...args], {
    stdio: 'inherit',
  });
}

function sortedUpMigrations() {
  if (!fs.existsSync(backproMigrationsDir)) {
    console.error(`Backpro migrations not found: ${backproMigrationsDir}`);
    process.exit(1);
  }
  return fs
    .readdirSync(backproMigrationsDir)
    .filter((f) => f.endsWith('.up.sql'))
    .sort();
}

const sourceUrl = requireUrl('SOURCE_DATABASE_URL');
const targetUrl = requireUrl('TARGET_DATABASE_URL');

console.log(
  'Target:',
  new URL(targetUrl).hostname,
  new URL(targetUrl).pathname
);
console.log(
  'Source:',
  new URL(sourceUrl).hostname,
  new URL(sourceUrl).pathname
);

console.log('\n1/3 Neon prelude (uuidv7 shim)…');
psql(targetUrl, ['-f', path.join(dirname, 'sql', 'backpro-neon-prelude.sql')]);

console.log('\n2/3 Backpro schema migrations…');
for (const file of sortedUpMigrations()) {
  const full = path.join(backproMigrationsDir, file);
  console.log(`  → ${file}`);
  psql(targetUrl, ['-f', full]);
}

psql(targetUrl, [
  '-c',
  `CREATE TABLE IF NOT EXISTS schema_migrations (version bigint NOT NULL PRIMARY KEY, dirty boolean NOT NULL);
   INSERT INTO schema_migrations (version, dirty) VALUES (${LATEST_MIGRATION_VERSION}, false)
   ON CONFLICT (version) DO UPDATE SET dirty = excluded.dirty;`,
]);

console.log('\n3/3 Copy landing API data from source…');
const tmpDir = fs.mkdtempSync(path.join(dirname, '.backpro-data-'));
const dumpFile = path.join(tmpDir, 'backpro-data.sql');

try {
  const dumpArgs = [
    sourceUrl,
    '--data-only',
    '--schema=public',
    '--no-owner',
    '--no-privileges',
    '-f',
    dumpFile,
    ...DATA_TABLES.flatMap((t) => ['--table', t]),
  ];
  execFileSync('pg_dump', dumpArgs, { stdio: 'inherit' });

  for (const table of DATA_TABLES) {
    psql(targetUrl, ['-c', `TRUNCATE TABLE public.${table} CASCADE;`]);
  }

  psql(targetUrl, ['-f', dumpFile]);
  console.log('Data copy complete.');
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

console.log('\nRow counts on Neon (public):');
for (const table of [...DATA_TABLES, 'countries']) {
  const count = execFileSync(
    'psql',
    [targetUrl, '-tAc', `SELECT count(*)::text FROM public.${table};`],
    { encoding: 'utf8' }
  ).trim();
  console.log(`  ${table}: ${count}`);
}

console.log(
  '\nDone. Point backpro INFRA_POSTGRES_* at this Neon DB for waitlist/contact/location APIs.'
);
