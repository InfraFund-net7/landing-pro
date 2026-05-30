import config from '@payload-config';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPayload } from 'payload';
import { canManageContent } from './roles.js';

/** @returns {Promise<import('payload').TypedUser | null>} */
async function getAuthenticatedAdminUser() {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });
  return user ?? null;
}

/** @returns {Promise<import('payload').TypedUser>} */
export async function requireContentManager() {
  const user = await getAuthenticatedAdminUser();
  if (!canManageContent(user)) {
    redirect('/admin/login');
  }
  return user;
}
