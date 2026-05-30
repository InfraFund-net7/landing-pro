import type { JSX } from 'react';
import { mockBlogs, type Blog } from '@/data/mockBlog';
import { fetchApprovedCommentsForPost } from '@/lib/cms-comments';
import { fetchCmsPostBySlug, fetchCmsPostSlugs } from '@/lib/cms-posts';
import { notFound } from 'next/navigation';
import BlogPage from '@/component/blog/blog-page';

/** ISR; CMS post when published, else mock fallback for legacy slugs. */
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchCmsPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

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

  const comments =
    blog.id != null ? await fetchApprovedCommentsForPost(blog.id) : [];

  return <BlogPage blog={blog} comments={comments} />;
}
