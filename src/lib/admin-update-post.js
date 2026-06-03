import config from '@payload-config';
import { getPayload } from 'payload';
import { buildPostSaveBody, isEmptyHtml } from './admin-post-form-utils.js';

/**
 * @param {string | number} id
 * @param {FormData} formData
 * @param {import('payload').TypedUser} user
 */
export async function updatePostFromFormData(id, formData, user) {
  const title = String(formData.get('title') || '').trim();
  const manualSlug = String(formData.get('slug') || '').trim();
  const intent = String(formData.get('intent') || '').trim();
  const mainContent = String(formData.get('mainContent') || '').trim();
  const author = String(formData.get('author') || 'Editorial').trim();
  const tagsRaw = String(formData.get('tags') || '').trim();
  const categoriesRaw = String(formData.get('categories') || '').trim();
  const existingPublishedAt = String(
    formData.get('existingPublishedAt') || ''
  ).trim();

  if (!title) {
    return { ok: false, error: 'Title is required' };
  }
  if (!mainContent || isEmptyHtml(mainContent)) {
    return { ok: false, error: 'Main content is required' };
  }

  const data = buildPostSaveBody({
    title,
    slug: manualSlug,
    mainContent,
    intent,
    author,
    categoriesRaw,
    tagsRaw,
    existingPublishedAt: existingPublishedAt || undefined,
  });

  if (!data.slug) {
    return { ok: false, error: 'Valid slug is required' };
  }

  try {
    const payload = await getPayload({ config });

    await payload.update({
      collection: 'posts',
      id,
      user,
      overrideAccess: false,
      data,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to update post. Please try again.';
    return { ok: false, error: message };
  }

  return { ok: true };
}
