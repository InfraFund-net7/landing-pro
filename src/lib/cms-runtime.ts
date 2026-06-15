/**
 * When to hit Payload/Neon for marketing pages.
 * Blog: on by default when DATABASE_URL/POSTGRES_URL is set (Vercel + local with Neon).
 * Site pages: opt-in via CMS_REPLACE_EXISTING_PAGES.
 * Home: on when DATABASE_URL/POSTGRES_URL is set (opt-out with CMS_FETCH_HOME_PAGE=0).
 */

function envFlag(name: string): boolean {
  const v = process.env[name]?.trim().toLowerCase();
  return v === '1' || v === 'true';
}

function envDisabled(name: string): boolean {
  const v = process.env[name]?.trim().toLowerCase();
  return v === '0' || v === 'false';
}

function hasPayloadDatabase(): boolean {
  return Boolean(
    process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim()
  );
}

export const isCmsPageReplacementEnabled = envFlag(
  'CMS_REPLACE_EXISTING_PAGES'
);

export function shouldFetchSitePagesFromCms(): boolean {
  return isCmsPageReplacementEnabled;
}

export function shouldFetchHomePageFromCms(): boolean {
  if (envDisabled('CMS_FETCH_HOME_PAGE')) {
    return false;
  }
  return (
    isCmsPageReplacementEnabled ||
    envFlag('CMS_FETCH_HOME_PAGE') ||
    hasPayloadDatabase()
  );
}

export function shouldFetchBlogFromCms(): boolean {
  if (envFlag('CMS_USE_MOCK_BLOG') || envDisabled('CMS_FETCH_BLOG')) {
    return false;
  }
  return (
    isCmsPageReplacementEnabled ||
    envFlag('CMS_FETCH_BLOG') ||
    hasPayloadDatabase()
  );
}
