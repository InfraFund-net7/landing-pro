import { buildPayloadMediaFileUrl } from '@/lib/payload-media-file-url.js';
import { isCmsMediaFileProxy } from '@/lib/blob-storage-mode.js';

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
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
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

type CmsMediaRelation =
  | null
  | number
  | {
      url?: string | null;
      filename?: string | null;
      prefix?: string | null;
    };

export function cmsMediaFromRelation(
  media: CmsMediaRelation | undefined
): string | undefined {
  if (!media || typeof media !== 'object') return undefined;

  const rawUrl = typeof media.url === 'string' ? media.url.trim() : '';

  if (rawUrl.includes('public.blob.vercel-storage.com')) {
    return resolveCmsMediaUrl(rawUrl);
  }

  if (isCmsMediaFileProxy() && media.filename) {
    return resolveCmsMediaUrl(
      buildPayloadMediaFileUrl({
        filename: media.filename,
        prefix: media.prefix ?? undefined,
      })
    );
  }

  if (rawUrl) {
    return resolveCmsMediaUrl(rawUrl);
  }

  return undefined;
}
