/**
 * One-time: create Payload schema + tables on an empty Postgres (e.g. new Neon on Vercel).
 * Uses Drizzle push (dev only). Production runtime still has push: false in payload.config.js.
 *
 *   DATABASE_URL='postgresql://...@....neon.tech/neondb?sslmode=verify-full' npm run db:bootstrap:payload
 */
import pg from 'pg';
import { getPayload } from 'payload';
import {
  normalizePgConnectionString,
  pgSslOption,
} from '../lib/postgres-pool-config.js';
import config from '../payload.config.js';

const databaseUrl = normalizePgConnectionString(
  process.env.DATABASE_URL?.trim() ?? ''
);
if (!databaseUrl) {
  console.error(
    'DATABASE_URL is required.\n' +
      '  Option A: put your Neon URI in .env.local as DATABASE_URL=postgresql://...\n' +
      "  Option B: DATABASE_URL='postgresql://...@ep-xxx.region.aws.neon.tech/neondb?sslmode=verify-full' npm run db:bootstrap:payload\n" +
      'Copy from Neon → Connect → Connection string (URI), not a placeholder or psql command.'
  );
  process.exit(1);
}

let dbHost = '';
try {
  dbHost = new URL(databaseUrl).hostname;
} catch {
  console.error(
    'DATABASE_URL is not a valid URL. Use the full postgresql:// URI from Neon (one line, in quotes).'
  );
  process.exit(1);
}

if (dbHost === 'base' || dbHost === 'host' || dbHost === 'ep-xxx') {
  console.error(
    `DATABASE_URL hostname is "${dbHost}" — that is a placeholder, not your Neon host.\n` +
      'In Neon → Connect, copy the real URI. The host must look like ep-xxxx-xxxx.region.aws.neon.tech'
  );
  process.exit(1);
}

console.log(`Database host: ${dbHost}`);

process.env.NODE_ENV = 'development';
process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = 'true';
if (!process.env.DATABASE_URL?.trim()) {
  process.env.DATABASE_URL = databaseUrl;
}

console.log('Creating payload schema (if missing)…');
const client = new pg.Client({
  connectionString: databaseUrl,
  ssl: pgSslOption(databaseUrl),
});
await client.connect();
await client.query('CREATE SCHEMA IF NOT EXISTS payload');
await client.end();

console.log('Running Payload Drizzle push (all CMS tables)…');
await getPayload({ config });
console.log('Payload schema bootstrap complete.');
