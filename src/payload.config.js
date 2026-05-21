import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import fs from 'fs';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Comments } from './collections/Comments.js';
import { Media } from './collections/Media.js';
import { Posts } from './collections/Posts.js';
import { SitePages } from './collections/SitePages.js';
import { Users } from './collections/Users.js';
import { HomePage } from './globals/HomePage.js';
import './lib/neon-pg-setup.js';
import {
  buildPayloadPgPool,
  isNeonDatabaseUrl,
  neonConnectionKind,
  normalizePgConnectionString,
  resolvePgForPayload,
} from './lib/postgres-pool-config.js';
import { platformSmtpEmailAdapter } from './lib/payload-platform-smtp-email.js';

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
if (process.env.DATABASE_URL?.trim()) {
  process.env.DATABASE_URL = normalizePgConnectionString(
    process.env.DATABASE_URL.trim()
  );
}

const secret =
  payloadSecretResolved ||
  (!isProd ? devSecret : isNextProdBuildContext ? buildEphemeralSecret : '');

const databaseUrl =
  process.env.DATABASE_URL?.trim() ||
  databaseUrlResolved ||
  (!isProd ? devDatabaseUrl : isNextProdBuildContext ? devDatabaseUrl : '');

/** Never run Drizzle push on Vercel; bootstrap schema locally instead. */
const drizzlePush =
  !process.env.VERCEL &&
  (!isProd || process.env.PAYLOAD_FORCE_DRIZZLE_PUSH === 'true');

const pgForPayload = resolvePgForPayload(databaseUrl);

if (process.env.VERCEL && databaseUrl) {
  const driver = isNeonDatabaseUrl(databaseUrl) ? 'neon-serverless' : 'pg';
  console.log(
    `[payload] vercel db: neon=${neonConnectionKind(databaseUrl)} driver=${driver} push=${drizzlePush}`
  );
}

if (process.env.VERCEL && databaseUrl && isNeonDatabaseUrl(databaseUrl)) {
  const kind = neonConnectionKind(databaseUrl);
  if (kind === 'direct') {
    console.warn(
      '[payload] DATABASE_URL uses Neon direct host; for /admin on Vercel use the pooled connection string (-pooler in hostname).'
    );
  }
}

if (process.env.VERCEL && process.env.PAYLOAD_FORCE_DRIZZLE_PUSH === 'true') {
  console.error(
    '[payload] Unset PAYLOAD_FORCE_DRIZZLE_PUSH on Vercel — Drizzle push on /admin causes 60s timeouts.'
  );
}

if (isProd && !isNextProdBuildContext) {
  if (!payloadSecretResolved) throw new Error('Missing PAYLOAD_SECRET');
  if (!databaseUrlResolved) throw new Error('Missing DATABASE_URL');
}

/** Public origin for Payload (reset links, admin). Drops invalid values like `http://` with no host. */
function resolveServerURL() {
  const raw = process.env.PAYLOAD_PUBLIC_SERVER_URL?.trim();
  if (!raw) return undefined;
  try {
    const u = new URL(raw);
    if (!u.hostname) return undefined;
    return u.origin;
  } catch {
    return undefined;
  }
}

const serverURL = resolveServerURL();

const email = platformSmtpEmailAdapter();

export default buildConfig({
  admin: {
    user: Users.slug,
    // Easier to read than the default dark / system UI (use 'all' to let users switch again).
    theme: 'light',
    components: {
      logout: {
        Button:
          './app/(payload)/admin/components/payload-sign-out-button#PayloadSignOutButton',
      },
    },
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
  ...(email ? { email } : {}),
  collections: [Users, Media, Posts, Comments, SitePages],
  globals: [HomePage],
  editor: lexicalEditor(),
  secret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    // Keep Payload tables out of `public` when the DB is shared (e.g. with backpro).
    // Avoids Drizzle rename prompts against unrelated tables and broken refs like `lockout_audit_logs`.
    // One-time on existing DB: `CREATE SCHEMA IF NOT EXISTS payload;` then `npm run db:bootstrap:payload`
    schemaName: 'payload',
    pg: pgForPayload,
    pool: buildPayloadPgPool(databaseUrl),
    // Dev: sync schema on connect. Prod/Vercel: false — bootstrap Neon once (see docs/deploy-vercel.md).
    push: drizzlePush,
  }),
  sharp,
  plugins: [],
});
