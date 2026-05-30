/**
 * Seed Payload CMS with marketing content (home global, site pages, blog posts).
 *
 *   npm run db:bootstrap:payload   # once, if schema missing
 *   npm run seed:all               # uses .env.local DATABASE_URL
 *
 * One-off Neon URL (zsh: quote the URL — `&` and `?` break unquoted strings):
 *   DATABASE_URL='postgresql://user:pass@ep-….pooler….neon.tech/neondb?sslmode=verify-full' npm run seed:all
 *
 * Shell DATABASE_URL wins over .env.local for this run; child scripts inherit it
 * (they do not reload .env.local).
 *
 * Media on Vercel: set BLOB_READ_WRITE_TOKEN (from Vercel → Storage → Blob) when seeding
 * against Neon, or files stay on your laptop and /admin thumbnails break on Vercel.
 *
 * Optional: --force to update existing rows and re-upload media files.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, '../..');
const force = process.argv.includes('--force');

function run(scriptName) {
  const script = path.join(dirname, scriptName);
  const args = [script];
  if (force) args.push('--force');

  return new Promise((resolve, reject) => {
    const child = spawn('node', args, {
      cwd: root,
      stdio: 'inherit',
      env: process.env,
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${scriptName} exited with code ${code}`));
    });
  });
}

function warnIfRemoteDbWithoutBlob() {
  const dbUrl = (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    ''
  ).toLowerCase();
  const remoteDb =
    dbUrl.includes('neon.tech') ||
    dbUrl.includes('vercel-storage.com') ||
    (dbUrl && !dbUrl.includes('127.0.0.1') && !dbUrl.includes('localhost'));
  const hasBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
  if (remoteDb && !hasBlob) {
    console.warn(
      '\n[seed] BLOB_READ_WRITE_TOKEN is not set. Media binaries will be saved locally only;\n' +
        '      Vercel /admin and the site will show broken images until you re-seed with your\n' +
        '      Vercel Blob token (and --force to re-upload existing media rows).\n'
    );
  }
}

async function main() {
  warnIfRemoteDbWithoutBlob();
  console.log('Seeding Payload (home-page → site-pages → posts)…\n');
  await run('seed-home-page.mjs');
  await run('seed-site-pages.mjs');
  await run('seed-posts.mjs');
  console.log('\nAll seeds finished.');
  console.log(
    'Blog UI reads from CMS when DATABASE_URL is set (no CMS_FETCH_BLOG needed on Vercel).'
  );
  console.log(
    'Optional: CMS_REPLACE_EXISTING_PAGES=1 and CMS_FETCH_HOME_PAGE=1 for full CMS-driven pages.'
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
