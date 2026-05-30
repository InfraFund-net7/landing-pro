/**
 * Regenerate src/app/(payload)/admin/importMap.js for Payload admin UI.
 *
 * Vercel Blob client uploads require VercelBlobClientUploadHandler in the map.
 * That entry is only emitted when BLOB_READ_WRITE_TOKEN is set (see payload.config.js).
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, '../..');

const placeholderToken =
  'vercel_blob_rw_build00000000000000000000000000000000_build00000000000000000000000000000000';

const env = {
  ...process.env,
  BLOB_READ_WRITE_TOKEN:
    process.env.BLOB_READ_WRITE_TOKEN?.trim() || placeholderToken,
  VERCEL: process.env.VERCEL?.trim() || '1',
};

const result = spawnSync(
  'npx',
  ['payload', '--disable-transpile', 'generate:importmap'],
  { cwd: root, stdio: 'inherit', env }
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const prettier = spawnSync(
  'npx',
  ['prettier', '--write', 'src/app/(payload)/admin/importMap.js'],
  { cwd: root, stdio: 'inherit' }
);

process.exit(prettier.status ?? 0);
