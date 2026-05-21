import Blog from '@/component/blog/blog';
import { fetchCmsPostsForListing } from '@/lib/cms-posts';
import { fetchSitePageBySlug } from '@/lib/cms-site-pages';
import React from 'react';

/** ISR; CMS blog when CMS_FETCH_BLOG=1 or CMS_REPLACE_EXISTING_PAGES=1. */
export const revalidate = 60;

export default async function page() {
  const cmsPage = await fetchSitePageBySlug('blog');
  const cmsPosts = await fetchCmsPostsForListing();
  return <Blog cmsPosts={cmsPosts} cmsPage={cmsPage} />;
}
