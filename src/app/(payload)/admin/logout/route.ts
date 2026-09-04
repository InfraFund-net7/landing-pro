import config from '@payload-config';
import { logout } from '@payloadcms/next/auth';
import { clearPayloadAuthCookies } from '@/lib/payload-clear-auth';
import { NextResponse } from 'next/server';

async function signOutPayloadAdmin(request: Request) {
  try {
    await logout({ allSessions: true, config });
  } catch {
    // Still clear cookies when logoutOperation fails (e.g. unauthorized session).
  }

  const requestUrl = new URL(request.url);
  const loginUrl = new URL('/admin/login', requestUrl);
  loginUrl.searchParams.set('signedOut', '1');

  const response = NextResponse.redirect(loginUrl);
  response.headers.set('Cache-Control', 'no-store');

  await clearPayloadAuthCookies(response, requestUrl.hostname);
  return response;
}

export async function GET(request: Request) {
  return signOutPayloadAdmin(request);
}

export async function POST(request: Request) {
  return signOutPayloadAdmin(request);
}
