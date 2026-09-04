import { canManageContent, isMasterAdmin } from '@/access/roles.js';
import { importMap } from '@/app/(payload)/admin/importMap.js';
import config from '@payload-config';
import { executeAuthStrategies, getPayload } from 'payload';

/**
 * @param {Request} request
 * @returns {Promise<{ payload: import('payload').Payload; user: import('payload').TypedUser | null }>}
 */
export async function getAdminApiContext(request) {
  const payload = await getPayload({ config, importMap });
  const { user } = await executeAuthStrategies({
    headers: request.headers,
    payload,
  });
  return { payload, user };
}

/** @param {import('payload').TypedUser | null | undefined} user */
export function isContentManager(user) {
  return canManageContent(user);
}

/** @param {import('payload').TypedUser | null | undefined} user */
export function isMasterAdminUser(user) {
  return isMasterAdmin(user);
}
