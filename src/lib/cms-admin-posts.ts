import config from '@payload-config';
import { getPayload } from 'payload';
import { cmsMediaFromRelation } from '@/lib/cms-media-url';
import { shouldFetchBlogFromCms } from '@/lib/cms-runtime';
import { skipPayloadFetchAtBuild } from '@/lib/skip-payload-fetch-at-build';
import type { AdminPost, AdminPostStats } from '@/lib/cms-post-types';

function formatAdminDate(value: unknown): string {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString();
}

function mapAdminPost(doc: {
  id: number;
  title: string;
  slug: string;
  description: string;
  author?: string | null;
  published?: boolean | null;
  publishedAt?: string | Date | null;
  updatedAt?: string | Date | null;
  readTime?: string | null;
  categories?: string[] | null;
  category?: string | null;
  tags?: { tag?: string | null }[] | null;
  featuredImage?:
    | null
    | number
    | { url?: string | null; filename?: string | null };
}): AdminPost {
  const categories = Array.isArray(doc.categories)
    ? doc.categories.map(String).filter(Boolean)
    : [];
  const legacyCategory = String(doc.category ?? '').trim();
  const allCategories = [
    ...new Set([legacyCategory, ...categories].filter(Boolean)),
  ];

  const tags = Array.isArray(doc.tags)
    ? doc.tags.map((entry) => String(entry?.tag ?? '').trim()).filter(Boolean)
    : [];

  const published = Boolean(doc.published);

  return {
    id: Number(doc.id),
    title: String(doc.title ?? ''),
    slug: String(doc.slug ?? ''),
    description: String(doc.description ?? ''),
    author: String(doc.author ?? 'Editorial'),
    published,
    status: published ? 'published' : 'draft',
    publishedAt: formatAdminDate(doc.publishedAt),
    updatedAt:
      formatAdminDate(doc.updatedAt) || formatAdminDate(doc.publishedAt),
    readTime: String(doc.readTime ?? ''),
    categories: allCategories,
    tags,
    imageUrl: cmsMediaFromRelation(doc.featuredImage),
  };
}

export function buildAdminPostStats(posts: AdminPost[]): AdminPostStats {
  const categorySet = new Set<string>();
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  let published = 0;
  let drafts = 0;
  let publishedThisMonth = 0;

  for (const post of posts) {
    for (const category of post.categories) {
      categorySet.add(category);
    }

    if (post.published) {
      published += 1;
      const publishedAt = new Date(post.publishedAt);
      if (!Number.isNaN(publishedAt.getTime()) && publishedAt >= monthStart) {
        publishedThisMonth += 1;
      }
    } else {
      drafts += 1;
    }
  }

  return {
    total: posts.length,
    published,
    drafts,
    categories: categorySet.size,
    publishedThisMonth,
  };
}

export async function fetchAllPostsForAdmin(): Promise<AdminPost[]> {
  if (!shouldFetchBlogFromCms()) return [];
  if (skipPayloadFetchAtBuild()) return [];

  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: 'posts',
      sort: '-updatedAt',
      limit: 200,
      depth: 1,
    });

    return docs.map((doc) => mapAdminPost(doc));
  } catch (error) {
    console.error('[cms-admin-posts] fetchAllPostsForAdmin failed:', error);
    return [];
  }
}
