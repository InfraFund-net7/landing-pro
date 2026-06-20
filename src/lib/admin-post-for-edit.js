import config from '@payload-config';
import { cmsMediaFromRelation } from './cms-media-url';
import { getPayload } from 'payload';

/**
 * @param {string | number} id
 * @param {import('payload').TypedUser} user
 */
export async function fetchPostForEdit(id, user) {
  const payload = await getPayload({ config });

  try {
    return await payload.findByID({
      collection: 'posts',
      id,
      user,
      overrideAccess: false,
      depth: 1,
    });
  } catch {
    return null;
  }
}

/** @param {import('@/payload-types').Post} post */
export function postToEditorInitialValues(post) {
  const tags = Array.isArray(post.tags)
    ? post.tags
        .map((entry) =>
          entry && typeof entry === 'object' && 'tag' in entry
            ? String(entry.tag)
            : ''
        )
        .filter(Boolean)
    : [];

  const featured = post.featuredImage;
  let featuredImageId = null;
  let featuredImageUrl = null;

  if (featured && typeof featured === 'object') {
    featuredImageId = Number(featured.id);
    featuredImageUrl = cmsMediaFromRelation(featured) ?? null;
  } else if (typeof featured === 'number') {
    featuredImageId = featured;
  }

  const authorUser = post.authorUser;
  const hasLinkedAuthor =
    authorUser != null &&
    (typeof authorUser === 'number' ||
      (typeof authorUser === 'object' && authorUser.id != null));
  const authorKind = hasLinkedAuthor
    ? 'self'
    : String(post.author ?? 'Editorial') === 'Editorial'
      ? 'editorial'
      : 'self';

  return {
    title: String(post.title ?? ''),
    slug: String(post.slug ?? ''),
    mainContent: String(post.mainContent ?? ''),
    author: authorKind,
    categories: Array.isArray(post.categories)
      ? post.categories.map((value) => String(value))
      : [],
    tags: tags.join(', '),
    readTime: String(post.readTime ?? ''),
    published: Boolean(post.published),
    publishedAt: post.publishedAt ? String(post.publishedAt) : '',
    featuredImageId:
      Number.isFinite(featuredImageId) && featuredImageId > 0
        ? featuredImageId
        : null,
    featuredImageUrl,
    seoSummary: String(post.description ?? ''),
  };
}
