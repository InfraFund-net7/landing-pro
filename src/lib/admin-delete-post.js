import config from '@payload-config';
import { getPayload } from 'payload';
import { revalidateMarketingPath } from './revalidate-marketing-path.js';

/**
 * @param {unknown} parent
 */
function resolveRelationId(parent) {
  if (parent == null) return null;
  if (typeof parent === 'object' && parent !== null && 'id' in parent) {
    return Number(parent.id);
  }
  const numeric = Number(parent);
  return Number.isFinite(numeric) ? numeric : null;
}

/**
 * @param {import('payload').Payload} payload
 * @param {string | number} postId
 * @param {import('payload').TypedUser} user
 */
async function deleteCommentsForPost(payload, postId, user) {
  const numericId = Number(postId);
  const { docs } = await payload.find({
    collection: 'comments',
    where: {
      post: {
        equals: numericId,
      },
    },
    limit: 500,
    depth: 0,
    user,
    overrideAccess: false,
  });

  if (docs.length === 0) return;

  const pending = new Map(docs.map((doc) => [doc.id, doc]));

  while (pending.size > 0) {
    let progress = false;

    for (const [commentId, comment] of [...pending.entries()]) {
      const parentId = resolveRelationId(comment.parent);
      if (parentId != null && pending.has(parentId)) {
        continue;
      }

      await payload.delete({
        collection: 'comments',
        id: commentId,
        user,
        overrideAccess: false,
      });

      pending.delete(commentId);
      progress = true;
    }

    if (!progress) {
      throw new Error(
        'Unable to delete comments linked to this post. Remove them in Comments first.'
      );
    }
  }
}

/**
 * @param {import('payload').Payload} payload
 * @param {string | number} postId
 * @param {import('payload').TypedUser} user
 */
async function clearComposeScheduleLastPost(payload, postId, user) {
  const numericId = Number(postId);
  const { docs } = await payload.find({
    collection: 'compose-schedules',
    where: {
      lastPost: {
        equals: numericId,
      },
    },
    limit: 100,
    depth: 0,
    user,
    overrideAccess: false,
  });

  for (const schedule of docs) {
    await payload.update({
      collection: 'compose-schedules',
      id: schedule.id,
      data: { lastPost: null },
      user,
      overrideAccess: false,
    });
  }
}

/**
 * @param {string | number} id
 * @param {import('payload').TypedUser} user
 * @param {import('payload').Payload} [payloadInstance]
 */
export async function deletePostFromAdmin(id, user, payloadInstance) {
  try {
    const payload = payloadInstance ?? (await getPayload({ config }));

    const post = await payload.findByID({
      collection: 'posts',
      id,
      user,
      overrideAccess: false,
    });

    const slug = String(post.slug ?? '');
    const wasPublished = Boolean(post.published);

    await deleteCommentsForPost(payload, id, user);
    await clearComposeScheduleLastPost(payload, id, user);

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
