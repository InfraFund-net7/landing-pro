import { resetPasswordFromFormData } from '@/lib/admin-reset-password.js';
import { generatePayloadCookie } from 'payload';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const result = await resetPasswordFromFormData(formData);

  if (!result.ok) {
    return NextResponse.json({ message: result.error }, { status: 400 });
  }

  if (!result.authToken) {
    return NextResponse.json(
      { message: 'Password was saved but sign-in could not be completed.' },
      { status: 500 }
    );
  }

  const cookie = generatePayloadCookie({
    collectionAuthConfig: result.collectionAuthConfig,
    cookiePrefix: result.cookiePrefix,
    token: result.authToken,
  });

  const response = NextResponse.json({
    ok: true,
    redirectTo: '/admin/create-post',
    message: 'Password created successfully.',
  });
  response.headers.set('Set-Cookie', cookie);
  return response;
}
