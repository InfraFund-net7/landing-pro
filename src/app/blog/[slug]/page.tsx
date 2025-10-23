import type { JSX } from "react"
import { mockBlogs, type Blog } from "@/data/mockBlog"
import { notFound } from "next/navigation"
import BlogPage from "@/component/blog/blog-page"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<JSX.Element> {
  const { slug } = await params

  const blog: Blog | undefined = mockBlogs.find((b) => b.slug === slug)

  if (!blog) return notFound()

  return <BlogPage blog={blog} />
}
