import { buildPostSaveBody } from '@/lib/admin-post-form-utils.js';
import {
  composePostDraftSchema,
  markdownToPostHtml,
  type ComposePostDraft,
} from '@/lib/compose-post';
import { getUserDisplayName } from '@/lib/user-profile.js';
import type { Payload, TypedUser } from 'payload';

export async function saveComposeDraftAsPost(
  payload: Payload,
  user: TypedUser,
  draftInput: ComposePostDraft
): Promise<{ id: number; slug: string }> {
  const parsed = composePostDraftSchema.safeParse(draftInput);
  if (!parsed.success) {
    throw new Error('Draft is missing required fields.');
  }

  const draft = parsed.data;
  const mainContent = markdownToPostHtml(draft.markdown);

  if (!mainContent.trim()) {
    throw new Error('Draft content could not be converted to post HTML.');
  }

  const data = buildPostSaveBody({
    title: draft.title,
    slug: '',
    mainContent,
    intent: 'draft',
    authorKind: 'self',
    userId: user.id,
    userDisplayName: getUserDisplayName(user),
    categoriesRaw: draft.categories.join(', '),
    tagsRaw: draft.tags.join(', '),
    existingPublishedAt: '',
  });

  data.description = draft.description;

  const doc = await payload.create({
    collection: 'posts',
    user,
    overrideAccess: false,
    data,
  });

  return { id: doc.id as number, slug: doc.slug as string };
}
