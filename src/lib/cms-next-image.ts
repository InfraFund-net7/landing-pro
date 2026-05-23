import type { StaticImageData } from 'next/image';

/** CMS proxy URLs fail under Vercel Deployment Protection when next/image optimizes server-side. */
export function cmsImageNeedsUnoptimized(
  src: string | StaticImageData | undefined
): boolean {
  if (!src || typeof src !== 'string') return false;
  return src.includes('/cms/api/media/file/');
}
