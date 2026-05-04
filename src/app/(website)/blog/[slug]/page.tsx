import type { JSX } from 'react';
import { mockBlogs, type Blog } from '@/data/mockBlog';
import { fetchCmsPostBySlug } from '@/lib/cms-posts';
import { notFound } from 'next/navigation';
import BlogPage from '@/component/blog/blog-page';

/**
 * Post body comes from CMS at request time using runtime `DATABASE_URL`.
 * Image build skips Payload via `SKIP_PAYLOAD_FETCH_AT_BUILD` only in the Dockerfile.
 */
export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<JSX.Element> {
  const { slug } = await params;

  const fromCms = await fetchCmsPostBySlug(slug);
  const blog: Blog | undefined =
    fromCms ?? mockBlogs.find((b) => b.slug === slug);

  if (!blog) return notFound();

  return <BlogPage blog={blog} />;
}
