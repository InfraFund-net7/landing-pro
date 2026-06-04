/** @param {string | undefined} raw */
function resolvePayloadServerOrigin(raw) {
  const trimmed = raw?.trim();
  if (trimmed) {
    try {
      const u = new URL(trimmed);
      if (u.hostname) return u.origin;
    } catch {
      /* ignore */
    }
  }
  const vercelHost = process.env.VERCEL_URL?.trim();
  if (vercelHost) {
    const host = vercelHost.replace(/^https?:\/\//, '');
    return `https://${host}`;
  }
  return '';
}

/** Absolute or root-relative URL for Payload media file route (works with private Blob). */
export function buildPayloadMediaFileUrl({ filename, prefix }) {
  const encoded = encodeURIComponent(filename);
  let path = `/cms/api/media/file/${encoded}`;
  if (prefix) {
    path += `?prefix=${encodeURIComponent(prefix)}`;
  }
  const origin = resolvePayloadServerOrigin(
    process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL
  );
  return origin ? `${origin}${path}` : path;
}
