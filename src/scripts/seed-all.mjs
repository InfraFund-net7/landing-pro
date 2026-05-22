/**
 * Seed Payload CMS with marketing content (home global, site pages, blog posts).
 *
 *   npm run db:bootstrap:payload   # once, if schema missing
 *   npm run seed:all               # uses .env.local DATABASE_URL
 *
 * Optional: --force to update existing rows.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, '../..');
const force = process.argv.includes('--force');

function run(scriptName) {
  const script = path.join(dirname, scriptName);
  const args = ['--env-file=.env.local', '--env-file-if-exists=.env', script];
  if (force) args.push('--force');

  return new Promise((resolve, reject) => {
    const child = spawn('node', args, {
      cwd: root,
      stdio: 'inherit',
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${scriptName} exited with code ${code}`));
    });
  });
}

async function main() {
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
