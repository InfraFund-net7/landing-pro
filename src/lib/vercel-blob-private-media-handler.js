import { get } from '@vercel/blob';
import { getFileKey } from '@payloadcms/plugin-cloud-storage/utilities';

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

    const docPrefix = params?.prefix ?? doc?.prefix ?? '';
    const { fileKey } = getFileKey({
      collectionPrefix,
      docPrefix,
      filename,
      useCompositePrefixes,
    });

    try {
      const ifNoneMatch = req.headers.get('if-none-match') ?? undefined;
      const result = await get(fileKey, {
        access: 'private',
        token,
        ifNoneMatch,
      });

      if (result.statusCode === 304) {
        const headers = new Headers(incomingHeaders);
        headers.set('ETag', result.blob.etag);
        return new Response(null, { status: 304, headers });
      }

      if (!result.stream) {
        return new Response(null, { status: 404, statusText: 'Not Found' });
      }

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
      if (err?.name === 'BlobNotFoundError') {
        return new Response(null, { status: 404, statusText: 'Not Found' });
      }
      req.payload.logger.error({
        err,
        msg: `[media] private blob read failed for ${fileKey}`,
      });
      return new Response('Internal Server Error', { status: 500 });
    }
  };
}
