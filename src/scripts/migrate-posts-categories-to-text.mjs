/**
 * One-time migration after changing Posts.categories from select→text hasMany.
 * Renames payload.posts_categories → posts_texts and converts enum values to text
 * so Drizzle push no longer blocks dev with an interactive prompt.
 *
 *   npm run db:migrate:posts-categories
 */
import pg from 'pg';
import {
  normalizePgConnectionString,
  pgSslOption,
} from '../lib/postgres-pool-config.js';

const databaseUrl = normalizePgConnectionString(
  process.env.DATABASE_URL?.trim() ?? ''
);

if (!databaseUrl) {
  console.error('DATABASE_URL is required (e.g. in .env.local).');
  process.exit(1);
}

const client = new pg.Client({
  connectionString: databaseUrl,
  ssl: pgSslOption(databaseUrl),
});

await client.connect();

const textsExists = await client.query(
  `SELECT 1 FROM information_schema.tables
   WHERE table_schema = 'payload' AND table_name = 'posts_texts'`
);
const categoriesExists = await client.query(
  `SELECT 1 FROM information_schema.tables
   WHERE table_schema = 'payload' AND table_name = 'posts_categories'`
);

if (textsExists.rowCount) {
  const cols = await client.query(
    `SELECT column_name FROM information_schema.columns
     WHERE table_schema = 'payload' AND table_name = 'posts_texts'`
  );
  const names = cols.rows.map((row) => row.column_name);
  if (names.includes('path')) {
    console.log('payload.posts_texts already migrated — nothing to do.');
    await client.end();
    process.exit(0);
  }
  if (names.includes('value')) {
    console.log('Renaming payload.posts_texts.value → path…');
    await client.query(
      'ALTER TABLE payload.posts_texts RENAME COLUMN value TO path'
    );
    console.log('Column rename complete. Restart npm run dev.');
    await client.end();
    process.exit(0);
  }
}

if (!categoriesExists.rowCount) {
  console.log(
    'payload.posts_categories not found — run npm run dev once and choose create table, or npm run db:bootstrap:payload.'
  );
  await client.end();
  process.exit(0);
}

console.log('Migrating payload.posts_categories → payload.posts_texts…');

await client.query('BEGIN');
try {
  await client.query(
    'ALTER TABLE payload.posts_categories RENAME TO posts_texts'
  );
  await client.query(
    'ALTER TABLE payload.posts_texts ALTER COLUMN value TYPE text USING value::text'
  );
  await client.query(
    'ALTER TABLE payload.posts_texts RENAME COLUMN value TO path'
  );
  await client.query('DROP TYPE IF EXISTS payload.enum_posts_categories');
  await client.query('COMMIT');
  console.log('Migration complete. Restart npm run dev.');
} catch (error) {
  await client.query('ROLLBACK');
  console.error(
    'Migration failed:',
    error instanceof Error ? error.message : error
  );
  process.exit(1);
} finally {
  await client.end();
}
