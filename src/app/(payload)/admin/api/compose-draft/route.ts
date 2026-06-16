import { canManageContent } from '@/access/roles.js';
import { importMap } from '@/app/(payload)/admin/importMap.js';
import { getAdminApiContext } from '@/lib/admin-api-auth.js';
import { composePostDraftSchema, markdownToPostHtml } from '@/lib/compose-post';
import { buildPostSaveBody } from '@/lib/admin-post-form-utils.js';
import { getUserDisplayName } from '@/lib/user-profile.js';
import config from '@payload-config';
import { NextResponse } from 'next/server';
import { getPayload } from 'payload';

export async function POST(request: Request) {
  const { user } = await getAdminApiContext(request);

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!canManageContent(user)) {
    return NextResponse.json(
      { message: 'You do not have permission to create posts.' },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const parsed = composePostDraftSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Draft is missing required fields.' },
      { status: 400 }
    );
  }

  const draft = parsed.data;
  const mainContent = markdownToPostHtml(draft.markdown);

  if (!mainContent.trim()) {
    return NextResponse.json(
      { message: 'Draft content could not be converted to post HTML.' },
      { status: 400 }
    );
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
    readTimeRaw: draft.readTime,
    existingPublishedAt: '',
  });

  data.description = draft.description;

  try {
    const payload = await getPayload({ config, importMap });
    const doc = await payload.create({
      collection: 'posts',
      user,
      overrideAccess: false,
      data,
    });

    return NextResponse.json({ ok: true, id: doc.id, slug: doc.slug });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to save draft post. Please try again.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
