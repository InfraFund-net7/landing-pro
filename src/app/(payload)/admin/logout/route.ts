import config from '@payload-config';
import { logout } from '@payloadcms/next/auth';
import { clearPayloadAuthCookies } from '@/lib/payload-clear-auth';
import { redirect } from 'next/navigation';

async function signOutPayloadAdmin() {
  try {
    await logout({ allSessions: true, config });
  } catch {
    // Still clear cookies when logoutOperation fails (e.g. unauthorized session).
  }
  await clearPayloadAuthCookies();
}

export async function GET() {
  await signOutPayloadAdmin();
  redirect('/admin/login');
}

export async function POST() {
  await signOutPayloadAdmin();
  redirect('/admin/login');
}
