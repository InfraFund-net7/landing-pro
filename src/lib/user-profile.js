import { cmsMediaFromRelation } from './cms-media-url.js';

/** @param {import('payload').TypedUser | null | undefined} user */
export function getUserDisplayName(user) {
  const fullName = user?.fullName?.trim();
  if (fullName) return fullName;

  const email = user?.email?.trim();
  if (!email) return 'Editorial';

  const local = email.split('@')[0] ?? 'Admin';
  return local.charAt(0).toUpperCase() + local.slice(1);
}

/** @param {import('payload').TypedUser | null | undefined} user */
function getUserJobTitle(user) {
  return user?.jobTitle?.trim() ?? '';
}

/** @param {import('payload').TypedUser | null | undefined | Record<string, unknown>} user */
export function getUserAvatarUrl(user) {
  if (!user || typeof user !== 'object') return '';
  const photo = user.profilePhoto;
  if (!photo) return '';
  return cmsMediaFromRelation(photo) ?? '';
}

/** @param {import('payload').TypedUser} user */
function userToAuthorProfile(user) {
  return {
    name: getUserDisplayName(user),
    title: getUserJobTitle(user),
    avatar: getUserAvatarUrl(user),
  };
}

/** @param {unknown} authorUser */
export function authorProfileFromRelation(authorUser) {
  if (!authorUser || typeof authorUser !== 'object') {
    return { name: '', title: '', avatar: '' };
  }
  return userToAuthorProfile(authorUser);
}
