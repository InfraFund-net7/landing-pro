import { getAdminApiContext, isContentManager } from '@/lib/admin-api-auth.js';
import { updateProfileFromFormData } from '@/lib/admin-update-profile.js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { user } = await getAdminApiContext(request);

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!isContentManager(user)) {
    return NextResponse.json(
      { message: 'You do not have permission to update this profile.' },
      { status: 403 }
    );
  }

  const formData = await request.formData();
  const result = await updateProfileFromFormData(formData, user);

  if (!result.ok) {
    return NextResponse.json({ message: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, profile: result.profile });
}
