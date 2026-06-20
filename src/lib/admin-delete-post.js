import config from '@payload-config';
import { getPayload } from 'payload';
import { revalidateMarketingPath } from './revalidate-marketing-path.js';

/**
 * @param {string | number} id
 * @param {import('payload').TypedUser} user
 */
export async function deletePostFromAdmin(id, user) {
  try {
    const payload = await getPayload({ config });

    const post = await payload.findByID({
      collection: 'posts',
      id,
      user,
      overrideAccess: false,
    });

    const slug = String(post.slug ?? '');
    const wasPublished = Boolean(post.published);

    await payload.delete({
      collection: 'posts',
      id,
      user,
      overrideAccess: false,
    });

    if (wasPublished) {
      void revalidateMarketingPath('/blog');
      if (slug) {
        void revalidateMarketingPath(`/blog/${slug}`);
      }
    }

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to delete post. Please try again.';
    return { ok: false, error: message };
  }
}
