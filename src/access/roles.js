/** @typedef {'master-admin' | 'content-editor'} AdminRole */

export const ROLES = {
  MASTER_ADMIN: 'master-admin',
  CONTENT_EDITOR: 'content-editor',
};

/** @param {import('payload').TypedUser | null | undefined} user */
function getUserRole(user) {
  if (!user) return null;
  const role = user.role;
  // Accounts created before roles existed, or rows not migrated yet.
  if (!role || role === '') return ROLES.MASTER_ADMIN;
  return role;
}

/** Any CMS admin (master or content editor) may use the Payload dashboard. */
/** @param {import('payload').TypedUser | null | undefined} user */
export function canAccessAdmin(user) {
  if (!user) return false;
  const role = getUserRole(user);
  return role === ROLES.MASTER_ADMIN || role === ROLES.CONTENT_EDITOR;
}

/** @param {import('payload').TypedUser | null | undefined} user */
export function isMasterAdmin(user) {
  return getUserRole(user) === ROLES.MASTER_ADMIN;
}

/** @param {import('payload').TypedUser | null | undefined} user */
function isContentEditor(user) {
  return getUserRole(user) === ROLES.CONTENT_EDITOR;
}

/** Posts + comments (and media uploads needed for posts). */
/** @param {import('payload').TypedUser | null | undefined} user */
export function canManageContent(user) {
  return isMasterAdmin(user) || isContentEditor(user);
}
