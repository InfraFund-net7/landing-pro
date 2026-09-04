import type { StaticImageData } from 'next/image';

/** CMS proxy URLs fail under Vercel Deployment Protection when next/image optimizes server-side. */
export function cmsImageNeedsUnoptimized(
  src: string | StaticImageData | undefined
): boolean {
  if (!src || typeof src !== 'string') return false;
  return src.includes('/cms/api/media/file/');
}

export function contributorImageProps(src: string | StaticImageData) {
  if (typeof src === 'object' && src !== null && 'src' in src) {
    return {
      src,
      placeholder: 'blur' as const,
      blurDataURL: src.blurDataURL,
      unoptimized: false,
    };
  }

  const path = src || '/placeholder.svg';
  return {
    src: path,
    placeholder: undefined,
    blurDataURL: undefined,
    unoptimized: cmsImageNeedsUnoptimized(path),
  };
}
