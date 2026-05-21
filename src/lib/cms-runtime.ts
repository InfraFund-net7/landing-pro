/**
 * When to hit Payload/Neon for marketing pages. Default: handcrafted fallbacks only.
 * Enable CMS after seeding: CMS_REPLACE_EXISTING_PAGES=1 (site pages), optional
 * CMS_FETCH_HOME_PAGE=1 / CMS_FETCH_BLOG=1 for home or blog only.
 */

function envFlag(name: string): boolean {
  const v = process.env[name]?.trim().toLowerCase();
  return v === '1' || v === 'true';
}

export const isCmsPageReplacementEnabled = envFlag(
  'CMS_REPLACE_EXISTING_PAGES'
);

export function shouldFetchSitePagesFromCms(): boolean {
  return isCmsPageReplacementEnabled;
}

export function shouldFetchHomePageFromCms(): boolean {
  return isCmsPageReplacementEnabled || envFlag('CMS_FETCH_HOME_PAGE');
}

export function shouldFetchBlogFromCms(): boolean {
  return isCmsPageReplacementEnabled || envFlag('CMS_FETCH_BLOG');
}
