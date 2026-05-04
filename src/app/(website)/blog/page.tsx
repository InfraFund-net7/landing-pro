import Blog from '@/component/blog/blog';
import { fetchCmsPostsForListing } from '@/lib/cms-posts';
import React from 'react';

export default async function page() {
  const cmsPosts = await fetchCmsPostsForListing();
  return <Blog cmsPosts={cmsPosts} />;
}
