import config from '@payload-config';
import { logout } from '@payloadcms/next/auth';
import { clearPayloadAuthCookies } from '@/lib/payload-clear-auth';
import { NextResponse } from 'next/server';

async function signOutPayloadAdmin() {
  try {
    await logout({ allSessions: true, config });
  } catch {
    // Still clear cookies when logoutOperation fails (e.g. unauthorized session).
  }

  await clearPayloadAuthCookies();
}

export async function GET(request: Request) {
  await signOutPayloadAdmin();
  return NextResponse.redirect(new URL('/admin/login', request.url));
}

export async function POST(request: Request) {
  await signOutPayloadAdmin();
  return NextResponse.redirect(new URL('/admin/login', request.url));
}
