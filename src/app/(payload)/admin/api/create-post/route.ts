import { canManageContent } from '@/access/roles.js';
import { importMap } from '@/app/(payload)/admin/importMap.js';
import { createPostFromFormData } from '@/lib/admin-create-post.js';
import config from '@payload-config';
import { NextResponse } from 'next/server';
import { executeAuthStrategies, getPayload } from 'payload';

export async function POST(request: Request) {
  const payload = await getPayload({ config, importMap });
  const { user } = await executeAuthStrategies({
    headers: request.headers,
    payload,
  });

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

  const formData = await request.formData();
  const result = await createPostFromFormData(formData, user);

  if (!result.ok) {
    return NextResponse.json({ message: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
