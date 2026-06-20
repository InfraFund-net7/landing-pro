import type { Blog } from '@/data/mockBlog';
import type { StaticImageData } from 'next/image';
import config from '@payload-config';
import { getPayload } from 'payload';
import { cmsMediaFromRelation } from '@/lib/cms-media-url';
import { shouldFetchBlogFromCms } from '@/lib/cms-runtime';
import { skipPayloadFetchAtBuild } from '@/lib/skip-payload-fetch-at-build';
import {
  authorProfileFromRelation,
  fetchPublicAuthorProfilesByIds,
  resolveAuthorUserId,
} from '@/lib/user-profile.js';

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

function mapPostDoc(doc: {
  slug: string;
  title: string;
  description: string;
  publishedAt?: string | Date | null;
  readTime?: string | null;
  featuredImage?: null | number | { url?: string | null };
}): BlogListItem {
  return {
    slug: String(doc.slug),
    title: String(doc.title),
    description: String(doc.description),
    date: formatPostDate(doc.publishedAt ?? undefined) || '—',
    readTime: String(doc.readTime ?? ''),
    image: cmsMediaFromRelation(doc.featuredImage),
  };
}

export async function fetchCmsPostsForListing(): Promise<BlogListItem[]> {
  if (!shouldFetchBlogFromCms()) return [];
  if (skipPayloadFetchAtBuild()) return [];
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: 'posts',
      where: { published: { equals: true } },
      sort: '-publishedAt',
      limit: 100,
      depth: 1,
    });

    return docs.map((doc) => mapPostDoc(doc));
  } catch (error) {
    console.error('[cms-posts] fetchCmsPostsForListing failed:', error);
    return [];
  }
}

export async function fetchCmsPostBySlug(slug: string): Promise<Blog | null> {
  if (!shouldFetchBlogFromCms()) return null;
  if (skipPayloadFetchAtBuild()) return null;
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: 'posts',
      where: {
        and: [{ slug: { equals: slug } }, { published: { equals: true } }],
      },
      limit: 1,
      depth: 2,
    });
    const doc = docs[0];
    if (!doc) return null;

    const authorUserId = resolveAuthorUserId(doc.authorUser);
    const authorProfiles = authorUserId
      ? await fetchPublicAuthorProfilesByIds([authorUserId])
      : new Map();
    const linkedAuthor =
      (authorUserId && authorProfiles.get(authorUserId)) ||
      authorProfileFromRelation(doc.authorUser);
    const authorName = linkedAuthor.name || String(doc.author ?? '');
    const authorTitle = linkedAuthor.title;
    const authorAvatar = linkedAuthor.avatar;
    const authorLinkedInUrl = linkedAuthor.linkedinUrl || undefined;
    const authorXUrl = linkedAuthor.xUrl || undefined;

    const categories = Array.isArray(doc.categories)
      ? doc.categories.map(String).filter(Boolean)
      : [];
    const legacyCategory = String(doc.category ?? '').trim();
    const allCategories = [
      ...new Set(
        [legacyCategory, ...categories].filter(
          (value) => value && value.length > 0
        )
      ),
    ];

    const tags = Array.isArray(doc.tags)
      ? doc.tags
          .map((entry) =>
            entry && typeof entry === 'object' && 'tag' in entry
              ? String(entry.tag ?? '').trim()
              : ''
          )
          .filter(Boolean)
      : [];

    return {
      id: Number(doc.id),
      slug: String(doc.slug),
      title: String(doc.title),
      description: String(doc.description),
      mainContent: String(doc.mainContent ?? ''),
      date: formatPostDate(doc.publishedAt ?? undefined) || '—',
      readTime: String(doc.readTime ?? ''),
      author: authorName,
      authorTitle,
      authorAvatar,
      authorLinkedInUrl,
      authorXUrl,
      category: legacyCategory || allCategories[0] || 'Insights',
      categories: allCategories,
      tags,
      image: cmsMediaFromRelation(doc.featuredImage),
    };
  } catch (error) {
    console.error('[cms-posts] fetchCmsPostBySlug failed:', error);
    return null;
  }
}

export async function fetchCmsPostSlugs(): Promise<string[]> {
  if (!shouldFetchBlogFromCms()) return [];
  if (skipPayloadFetchAtBuild()) return [];
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: 'posts',
      where: { published: { equals: true } },
      limit: 200,
      depth: 0,
    });
    return docs.map((doc) => String(doc.slug));
  } catch {
    return [];
  }
}
