import { getAdminApiContext, isContentManager } from '@/lib/admin-api-auth.js';
import { updatePostFromFormData } from '@/lib/admin-update-post.js';
import { NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const { user } = await getAdminApiContext(request);

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!isContentManager(user)) {
    return NextResponse.json(
      { message: 'You do not have permission to edit posts.' },
      { status: 403 }
    );
  }

  const formData = await request.formData();
  const result = await updatePostFromFormData(id, formData, user);

  if (!result.ok) {
    return NextResponse.json({ message: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
