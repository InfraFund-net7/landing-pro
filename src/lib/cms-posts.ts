import type { Blog } from '@/data/mockBlog';
import type { StaticImageData } from 'next/image';
import config from '@payload-config';
import { getPayload } from 'payload';

type FeaturedImage = null | number | { url?: string };

function mediaUrl(img: FeaturedImage): string | undefined {
  if (
    img &&
    typeof img === 'object' &&
    'url' in img &&
    typeof img.url === 'string'
  ) {
    return img.url;
  }
  return undefined;
}

/**
 * Set only in `deployment/Dockerfile` for `npm run build` (no DB in the builder).
 * Do not set in develop/prod runtime — the app should use your real `DATABASE_URL` there.
 */
function skipPayloadFetchAtImageBuild(): boolean {
  return process.env.SKIP_PAYLOAD_FETCH_AT_BUILD === '1';
}

function formatPostDate(value: null | string | Date | undefined): string {
  if (!value) return '';
  const d = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export type BlogListItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image?: string | StaticImageData;
};

export async function fetchCmsPostsForListing(): Promise<BlogListItem[]> {
  if (skipPayloadFetchAtImageBuild()) return [];
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: 'posts',
      where: { published: { equals: true } },
      sort: '-publishedAt',
      limit: 100,
      depth: 1,
    });

    return docs.map((doc) => ({
      slug: String(doc.slug),
      title: String(doc.title),
      description: String(doc.description),
      date: formatPostDate(doc.publishedAt as Date | string | undefined) || '—',
      readTime: String(doc.readTime ?? ''),
      image: mediaUrl(doc.featuredImage as FeaturedImage),
    }));
  } catch {
    return [];
  }
}

export async function fetchCmsPostBySlug(slug: string): Promise<Blog | null> {
  if (skipPayloadFetchAtImageBuild()) return null;
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: 'posts',
      where: {
        and: [{ slug: { equals: slug } }, { published: { equals: true } }],
      },
      limit: 1,
      depth: 1,
    });
    const doc = docs[0];
    if (!doc) return null;

    return {
      slug: String(doc.slug),
      title: String(doc.title),
      description: String(doc.description),
      date: formatPostDate(doc.publishedAt as Date | string | undefined) || '—',
      readTime: String(doc.readTime ?? ''),
      author: String(doc.author ?? ''),
      category: String(doc.category ?? ''),
      image: mediaUrl(doc.featuredImage as FeaturedImage),
    };
  } catch {
    return null;
  }
}
