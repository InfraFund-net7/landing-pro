import { absolutizeCmsMediaUrlsInHtml } from './cms-media-url';
import { calculateReadTimeFromContent } from './read-time.js';

export function slugifyPost(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function excerptFromHtml(value) {
  const clean = value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean.length <= 160) return clean;
  return `${clean.slice(0, 157)}...`;
}

export function isEmptyHtml(html) {
  return !html.replace(/<[^>]*>/g, '').trim();
}

function parseCommaSeparatedList(raw) {
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

/** @param {FormData} formData */
export function parseFeaturedImageIdFromForm(formData) {
  const raw = String(formData.get('featuredImageId') ?? '').trim();
  if (!raw) return null;
  const id = Number(raw);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export function buildPostSaveBody({
  title,
  slug,
  mainContent,
  intent,
  authorKind,
  userId,
  userDisplayName,
  categoriesRaw,
  tagsRaw,
  existingPublishedAt,
}) {
  const resolvedSlug = slug.trim() ? slugifyPost(slug) : slugifyPost(title);
  const published = intent === 'published';
  const categories = parseCommaSeparatedList(categoriesRaw);
  const normalizedMainContent = absolutizeCmsMediaUrlsInHtml(mainContent);
  const isSelf = authorKind === 'self';

  return {
    title: title.trim(),
    slug: resolvedSlug,
    description: excerptFromHtml(normalizedMainContent),
    mainContent: normalizedMainContent,
    published,
    publishedAt: published
      ? existingPublishedAt || new Date().toISOString()
      : existingPublishedAt || null,
    readTime: calculateReadTimeFromContent(normalizedMainContent),
    author: isSelf ? userDisplayName : 'Editorial',
    authorUser: isSelf && userId ? userId : null,
    category: categories[0] || 'Insights',
    categories,
    tags: parseCommaSeparatedList(tagsRaw).map((tag) => ({ tag })),
  };
}

export function buildPreviewBlogFromEditor({
  title,
  slug,
  mainContent,
  authorKind,
  userDisplayName,
  authorTitle,
  authorAvatarUrl,
  coverImageUrl,
  categoriesRaw,
  tagsRaw,
  postId,
}) {
  const resolvedSlug = slug.trim() ? slugifyPost(slug) : slugifyPost(title);
  const categories = parseCommaSeparatedList(categoriesRaw);
  const tags = parseCommaSeparatedList(tagsRaw);
  const normalizedMainContent = absolutizeCmsMediaUrlsInHtml(mainContent);
  const isSelf = authorKind === 'self';
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    id: postId,
    slug: resolvedSlug || 'preview',
    title: title.trim() || 'Untitled post',
    description:
      excerptFromHtml(normalizedMainContent) ||
      'Add content to generate a summary.',
    mainContent: normalizedMainContent,
    image: coverImageUrl || undefined,
    date,
    readTime: calculateReadTimeFromContent(normalizedMainContent),
    author: isSelf ? userDisplayName : 'Editorial',
    authorTitle: isSelf ? authorTitle || undefined : undefined,
    authorAvatar: isSelf ? authorAvatarUrl || undefined : undefined,
    category: categories[0] || 'Insights',
    categories,
    tags,
  };
}

export function parsePayloadApiError(data, fallback) {
  if (!data || typeof data !== 'object') return fallback;
  if (Array.isArray(data.errors) && data.errors[0]?.message) {
    return data.errors[0].message;
  }
  if (typeof data.message === 'string') return data.message;
  return fallback;
}
