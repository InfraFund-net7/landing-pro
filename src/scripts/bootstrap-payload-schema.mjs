/**
 * One-time: create Payload schema + tables on an empty Postgres (e.g. new Neon on Vercel).
 * Uses Drizzle push (dev only). Production runtime still has push: false in payload.config.js.
 *
 *   DATABASE_URL='postgresql://...' node src/scripts/bootstrap-payload-schema.mjs
 */
import { execFileSync } from 'node:child_process';
import { getPayload } from 'payload';
import config from '../payload.config.js';

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  console.error('DATABASE_URL is required.');
  process.exit(1);
}

process.env.NODE_ENV = 'development';
process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = 'true';
if (!process.env.DATABASE_URL?.trim()) {
  process.env.DATABASE_URL = databaseUrl;
}

console.log('Creating payload schema (if missing)…');
execFileSync(
  'psql',
  [
    databaseUrl,
    '-v',
    'ON_ERROR_STOP=1',
    '-c',
    'CREATE SCHEMA IF NOT EXISTS payload;',
  ],
  {
    stdio: 'inherit',
  }
);

console.log('Running Payload Drizzle push (all CMS tables)…');
await getPayload({ config });
console.log('Payload schema bootstrap complete.');
