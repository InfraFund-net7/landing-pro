/**
 * Payload media URLs are often relative (/cms/api/media/file/...).
 * Next.js Image and ISR need an absolute URL when there is no browser origin.
 */
function resolveCmsMediaUrl(
  url: string | null | undefined
): string | undefined {
  if (!url || typeof url !== 'string') return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  const base =
    process.env.PAYLOAD_PUBLIC_SERVER_URL?.trim() ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, '')}`
      : '') ||
    'http://localhost:3000';

  try {
    const origin = new URL(base).origin;
    return new URL(trimmed.startsWith('/') ? trimmed : `/${trimmed}`, origin)
      .href;
  } catch {
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  }
}

export function cmsMediaFromRelation(
  media: null | number | { url?: string | null } | undefined
): string | undefined {
  if (media && typeof media === 'object' && typeof media.url === 'string') {
    return resolveCmsMediaUrl(media.url);
  }
  return undefined;
}
