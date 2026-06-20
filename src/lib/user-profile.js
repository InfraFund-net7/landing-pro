import { cmsMediaFromRelation } from './cms-media-url.js';
import config from '@payload-config';
import { getPayload } from 'payload';

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

/** @param {import('payload').TypedUser | null | undefined | Record<string, unknown>} user */
function getUserSocialUrl(user, field) {
  if (!user || typeof user !== 'object') return '';
  const value = user[field];
  return typeof value === 'string' ? value.trim() : '';
}

/** @param {import('payload').TypedUser} user */
function userToAuthorProfile(user) {
  return {
    name: getUserDisplayName(user),
    title: getUserJobTitle(user),
    avatar: getUserAvatarUrl(user),
    linkedinUrl: getUserSocialUrl(user, 'linkedinUrl'),
    xUrl: getUserSocialUrl(user, 'xUrl'),
  };
}

/** @param {unknown} authorUser */
export function resolveAuthorUserId(authorUser) {
  if (typeof authorUser === 'number') return authorUser;
  if (
    authorUser &&
    typeof authorUser === 'object' &&
    'id' in authorUser &&
    authorUser.id != null
  ) {
    return Number(authorUser.id);
  }
  return null;
}

/** @param {number[]} userIds */
export async function fetchPublicAuthorProfilesByIds(userIds) {
  const unique = [
    ...new Set(
      userIds.filter((id) => Number.isFinite(id) && id > 0).map(Number)
    ),
  ];

  if (unique.length === 0) return new Map();

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'users',
    where: {
      id: {
        in: unique,
      },
    },
    depth: 1,
    limit: unique.length,
    overrideAccess: true,
  });

  /** @type {Map<number, ReturnType<typeof userToAuthorProfile>>} */
  const profiles = new Map();

  for (const doc of docs) {
    profiles.set(Number(doc.id), userToAuthorProfile(doc));
  }

  return profiles;
}

/** @param {unknown} authorUser */
export function authorProfileFromRelation(authorUser) {
  if (!authorUser || typeof authorUser !== 'object') {
    return { name: '', title: '', avatar: '', linkedinUrl: '', xUrl: '' };
  }
  return userToAuthorProfile(authorUser);
}
