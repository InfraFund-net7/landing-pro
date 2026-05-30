/** @returns {'public' | 'private'} */
export function vercelBlobAccess() {
  return process.env.BLOB_STORAGE_ACCESS?.trim().toLowerCase() === 'private'
    ? 'private'
    : 'public';
}

/** Serve media via /cms/api/media/file (private Blob + SDK get). */
export function isCmsMediaFileProxy() {
  return (
    Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim()) &&
    vercelBlobAccess() === 'private'
  );
}
