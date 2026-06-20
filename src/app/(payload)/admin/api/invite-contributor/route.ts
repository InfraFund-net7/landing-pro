import { getAdminApiContext, isMasterAdminUser } from '@/lib/admin-api-auth.js';
import { inviteContributorFromFormData } from '@/lib/admin-invite-contributor.js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { user } = await getAdminApiContext(request);

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  return NextResponse.json({ canInvite: isMasterAdminUser(user) });
}

export async function POST(request: Request) {
  const { user } = await getAdminApiContext(request);

  if (!user) {
    return NextResponse.json(
      { message: 'Your session expired. Please sign in again.' },
      { status: 401 }
    );
  }

  if (!isMasterAdminUser(user)) {
    return NextResponse.json(
      { message: 'Only master admins can invite contributors.' },
      { status: 403 }
    );
  }

  const formData = await request.formData();
  const result = await inviteContributorFromFormData(formData, user, request);

  if (!result.ok) {
    return NextResponse.json({ message: result.error }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    email: result.email,
    resent: result.resent,
    message: result.resent
      ? `Invite resent to ${result.email}.`
      : `Invite sent to ${result.email}.`,
  });
}
