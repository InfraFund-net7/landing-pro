import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import fs from 'fs';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Media } from './collections/Media.js';
import { Posts } from './collections/Posts.js';
import { Users } from './collections/Users.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isProd = process.env.NODE_ENV === 'production';

// Next sets these during `next build` (webpack + static workers). They run with NODE_ENV=production
// but must not require real secrets in process.env (Docker BuildKit secrets are exported only in
// the outer shell; some worker paths can still see an empty value).
const isNextProdBuildContext =
  process.env.NEXT_PHASE === 'phase-production-build' ||
  process.env.NEXT_PRIVATE_BUILD_WORKER === '1';

const devSecret = 'local-dev-only-payload-secret-do-not-use-in-production-32';
const buildEphemeralSecret =
  'next-build-ephemeral-payload-secret-min-32-chars-not-for-runtime';
const devDatabaseUrl = 'postgresql://127.0.0.1:5432/postgres';

function readSecretFile(pathname) {
  if (!pathname) return '';
  try {
    return fs.readFileSync(pathname, 'utf8').trim();
  } catch {
    return '';
  }
}

/** Env var, or `*_FILE`, or Docker Compose default secret mount paths. */
function resolvePayloadSecret() {
  const fromEnv = process.env.PAYLOAD_SECRET?.trim();
  if (fromEnv) return fromEnv;
  return (
    readSecretFile(process.env.PAYLOAD_SECRET_FILE) ||
    readSecretFile('/run/secrets/payload_secret')
  );
}

function resolveDatabaseUrl() {
  const fromEnv = process.env.DATABASE_URL?.trim();
  if (fromEnv) return fromEnv;
  return (
    readSecretFile(process.env.DATABASE_URL_FILE) ||
    readSecretFile('/run/secrets/database_url')
  );
}

const payloadSecretResolved = resolvePayloadSecret();
const databaseUrlResolved = resolveDatabaseUrl();

if (payloadSecretResolved && !process.env.PAYLOAD_SECRET?.trim()) {
  process.env.PAYLOAD_SECRET = payloadSecretResolved;
}
if (databaseUrlResolved && !process.env.DATABASE_URL?.trim()) {
  process.env.DATABASE_URL = databaseUrlResolved;
}

const secret =
  payloadSecretResolved ||
  (!isProd ? devSecret : isNextProdBuildContext ? buildEphemeralSecret : '');

const databaseUrl =
  databaseUrlResolved ||
  (!isProd ? devDatabaseUrl : isNextProdBuildContext ? devDatabaseUrl : '');

if (isProd && !isNextProdBuildContext) {
  if (!payloadSecretResolved) throw new Error('Missing PAYLOAD_SECRET');
  if (!databaseUrlResolved) throw new Error('Missing DATABASE_URL');
}

const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL;

export default buildConfig({
  admin: {
    user: Users.slug,
    // Easier to read than the default dark / system UI (use 'all' to let users switch again).
    theme: 'light',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  routes: {
    api: '/cms/api',
    graphQL: '/cms/graphql',
    graphQLPlayground: '/cms/graphql-playground',
  },
  ...(serverURL ? { serverURL } : {}),
  collections: [Users, Media, Posts],
  editor: lexicalEditor(),
  secret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    // Keep Payload tables out of `public` when the DB is shared (e.g. with backpro).
    // Avoids Drizzle rename prompts against unrelated tables and broken refs like `lockout_audit_logs`.
    // One-time on existing DB: `CREATE SCHEMA IF NOT EXISTS payload;`
    schemaName: 'payload',
    pool: {
      connectionString: databaseUrl,
      options: '-c search_path=payload,public',
    },
    // Dev: sync schema to Postgres on connect (creates `users`, `media`, etc.).
    // Prod: never push here—ship schema via Payload migrations instead.
    push: !isProd,
  }),
  sharp,
  plugins: [],
});
