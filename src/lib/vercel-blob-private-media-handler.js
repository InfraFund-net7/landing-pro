import { get } from '@vercel/blob';
import { getFileKey } from '@payloadcms/plugin-cloud-storage/utilities';

function blobTargetFromDocUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed.includes('blob.vercel-storage.com')) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return null;
}

async function findMediaByFilename(req, filename) {
  const result = await req.payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  });
  return result.docs[0] ?? null;
}

/**
 * Prepended to media upload.handlers when BLOB_STORAGE_ACCESS=private.
 * Default @payloadcms/storage-vercel-blob getFile() uses unauthenticated fetch and 404s.
 */
export function createPrivateVercelBlobMediaHandler({
  token,
  collectionPrefix = '',
  useCompositePrefixes = false,
  cacheControlMaxAge = 60 * 60 * 24 * 365,
}) {
  return async (req, { headers: incomingHeaders, params, doc }) => {
    const filename = params?.filename;
    if (!filename) return null;

    const mediaDoc = doc ?? (await findMediaByFilename(req, filename));
    const docPrefix = params?.prefix ?? mediaDoc?.prefix ?? '';
    const { fileKey } = getFileKey({
      collectionPrefix,
      docPrefix,
      filename,
      useCompositePrefixes,
    });

    const targets = [
      blobTargetFromDocUrl(mediaDoc?.url),
      fileKey,
      decodeURIComponent(filename),
    ].filter(Boolean);

    const seen = new Set();
    const uniqueTargets = targets.filter((t) => {
      if (seen.has(t)) return false;
      seen.add(t);
      return true;
    });

    let lastError;
    for (const target of uniqueTargets) {
      try {
        const ifNoneMatch = req.headers.get('if-none-match') ?? undefined;
        const result = await get(target, {
          access: 'private',
          token,
          ifNoneMatch,
        });

        if (result.statusCode === 304) {
          const headers = new Headers(incomingHeaders);
          headers.set('ETag', result.blob.etag);
          return new Response(null, { status: 304, headers });
        }

        if (!result.stream) continue;

        const headers = new Headers(incomingHeaders);
        headers.set('Content-Type', result.blob.contentType);
        headers.set('Content-Disposition', result.blob.contentDisposition);
        headers.set('Cache-Control', `public, max-age=${cacheControlMaxAge}`);
        headers.set('ETag', result.blob.etag);
        if (result.blob.contentType === 'image/svg+xml') {
          headers.set('Content-Security-Policy', "script-src 'none'");
        }

        return new Response(result.stream, { headers, status: 200 });
      } catch (err) {
        lastError = err;
        if (err?.name !== 'BlobNotFoundError') break;
      }
    }

    if (lastError?.name === 'BlobNotFoundError') {
      return new Response(null, { status: 404, statusText: 'Not Found' });
    }
    if (lastError) {
      req.payload.logger.error({
        err: lastError,
        msg: `[media] private blob read failed for ${filename} (${uniqueTargets.join(', ')})`,
      });
      return new Response('Internal Server Error', { status: 500 });
    }

    return new Response(null, { status: 404, statusText: 'Not Found' });
  };
}
