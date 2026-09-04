import { canManageContent, isMasterAdmin } from '@/access/roles.js';

/** Payload native CMS entry point for site-wide content (globals, media, etc.). */
const PAYLOAD_CMS_HOME_PATH = '/admin/globals/home-page';

/** Custom blog admin portal dashboard. */
const BLOG_ADMIN_HOME_PATH = '/admin/create-post';

/**
 * Where `/admin` and post-login redirects should land.
 * Master admins use Payload CMS; content editors use the blog portal.
 *
 * @param {import('payload').TypedUser | null | undefined} user
 */
export function getDefaultAdminLandingPath(user) {
  if (isMasterAdmin(user)) {
    return PAYLOAD_CMS_HOME_PATH;
  }

  if (canManageContent(user)) {
    return BLOG_ADMIN_HOME_PATH;
  }

  return '/admin/login';
}

/**
 * @param {import('payload').TypedUser | null | undefined} user
 * @param {string | undefined} redirectPath
 */
export function resolveAdminRedirectPath(user, redirectPath) {
  const fallback = getDefaultAdminLandingPath(user);
  if (!redirectPath || !redirectPath.startsWith('/admin')) {
    return fallback;
  }

  if (!canManageContent(user)) {
    return '/admin/login';
  }

  if (!isMasterAdmin(user)) {
    const masterOnlyPrefixes = [
      '/admin/globals',
      '/admin/collections/site-pages',
      '/admin/collections/media',
      '/admin/create-user',
      '/admin/about-us',
    ];

    if (masterOnlyPrefixes.some((prefix) => redirectPath.startsWith(prefix))) {
      return BLOG_ADMIN_HOME_PATH;
    }
  }

  return redirectPath;
}
