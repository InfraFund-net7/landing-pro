import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
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

const secret =
  process.env.PAYLOAD_SECRET?.trim() ||
  (!isProd ? 'local-dev-only-payload-secret-do-not-use-in-production-32' : '');
const databaseUrl =
  process.env.DATABASE_URL?.trim() ||
  (!isProd ? 'postgresql://127.0.0.1:5432/postgres' : '');

if (isProd) {
  if (!process.env.PAYLOAD_SECRET?.trim())
    throw new Error('Missing PAYLOAD_SECRET');
  if (!process.env.DATABASE_URL?.trim())
    throw new Error('Missing DATABASE_URL');
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
