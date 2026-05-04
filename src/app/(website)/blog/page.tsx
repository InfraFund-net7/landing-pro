import Blog from '@/component/blog/blog';
import { fetchCmsPostsForListing } from '@/lib/cms-posts';
import React from 'react';

/**
 * Blog reads Postgres on every request using runtime `DATABASE_URL` (develop/prod).
 * Avoids baking a static HTML snapshot at image build time (when DB is unavailable in CI).
 */
export const dynamic = 'force-dynamic';

export default async function page() {
  const cmsPosts = await fetchCmsPostsForListing();
  return <Blog cmsPosts={cmsPosts} />;
}
