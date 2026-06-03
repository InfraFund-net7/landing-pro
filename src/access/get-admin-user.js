import { importMap } from '@/app/(payload)/admin/importMap.js';
import config from '@payload-config';
import { redirect } from 'next/navigation';
import { initReq } from 'payload-init-req';
import { canManageContent } from './roles.js';

/** @returns {Promise<import('payload').TypedUser | null>} */
async function getAuthenticatedAdminUser() {
  const { req } = await initReq({
    configPromise: config,
    importMap,
    key: 'customAdminPage',
  });
  return req.user ?? null;
}

/** @returns {Promise<import('payload').TypedUser>} */
export async function requireContentManager(
  redirectPath = '/admin/create-post'
) {
  const user = await getAuthenticatedAdminUser();
  if (!canManageContent(user)) {
    redirect(`/admin/login?redirect=${encodeURIComponent(redirectPath)}`);
  }
  return user;
}
