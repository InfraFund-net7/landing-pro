import { canManageContent } from '@/access/roles.js';
import { getAdminApiContext } from '@/lib/admin-api-auth.js';
import { composePostDraftSchema } from '@/lib/compose-post';
import { saveComposeDraftAsPost } from '@/lib/save-compose-draft';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { user, payload } = await getAdminApiContext(request);

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

  try {
    const saved = await saveComposeDraftAsPost(payload, user, parsed.data);
    return NextResponse.json({ ok: true, id: saved.id, slug: saved.slug });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to save draft post. Please try again.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
