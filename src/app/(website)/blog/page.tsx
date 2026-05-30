import Blog from '@/component/blog/blog';
import { fetchCmsPostsForListing } from '@/lib/cms-posts';
import { fetchSitePageBySlug } from '@/lib/cms-site-pages';
import React from 'react';

/** ISR; blog posts from Payload when DATABASE_URL is configured. */
export const revalidate = 60;

export default async function page() {
  const cmsPage = await fetchSitePageBySlug('blog');
  const cmsPosts = await fetchCmsPostsForListing();
  return <Blog cmsPosts={cmsPosts} cmsPage={cmsPage} />;
}
