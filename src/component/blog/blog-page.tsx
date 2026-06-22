import Image from 'next/image';
import { cmsImageNeedsUnoptimized } from '@/lib/cms-next-image';
import type { RefObject } from 'react';
import { BlogCategoryPill } from '@/component/blog/blog-category-pills';
import BlogComments from './blog-comments';
import BlogContents from './blog-contents';
import CmsBlogContent from './cms-blog-content';
import RelatedBlog from './related-blog';
import type { Blog } from '@/data/mockBlog';
import type { BlogComment } from '@/lib/cms-comments';

interface BlogPageProps {
  blog: Blog;
  comments: BlogComment[];
  previewMode?: boolean;
  scrollRootRef?: RefObject<HTMLElement | null>;
  layoutOffset?: number;
}

export default function BlogPage({
  blog,
  comments,
  previewMode = false,
  scrollRootRef,
  layoutOffset,
}: BlogPageProps) {
  const pagePadding = 'py-[175px]';
  const categories = blog.categories ?? (blog.category ? [blog.category] : []);
  const uniqueCategories = [...new Set(categories.filter(Boolean))];
  const uniqueTags = [
    ...new Set((blog.tags ?? []).map((tag) => tag.replace(/^#/, '').trim())),
  ].filter(Boolean);

  return (
    <div
      className={`w-full min-h-screen flex flex-col gap-16 md:gap-24 justify-center items-center px-4 sm:px-8 md:px-[90px] ${pagePadding}`}
    >
      <div className="w-full flex flex-col gap-8 md:gap-12">
        <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-6">
          <div className="w-full lg:flex-1 flex flex-col justify-between items-center lg:items-start text-center lg:text-left gap-6 lg:min-h-[311px]">
            <h1 className="text-[32px] sm:text-[40px] md:text-[49px] text-white font-medium leading-tight">
              {blog.title}
            </h1>

            <div className="w-full flex justify-center sm:justify-start">
              <div className="flex justify-center sm:justify-start items-start gap-3 w-fit">
                {blog.authorAvatar ? (
                  <Image
                    src={blog.authorAvatar}
                    width={60}
                    height={60}
                    alt={blog.author}
                    unoptimized={cmsImageNeedsUnoptimized(blog.authorAvatar)}
                    className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] bg-blue-500 rounded-full shrink-0" />
                )}
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <p className="font-medium text-white">{blog.author}</p>
                  {blog.authorTitle ? (
                    <p className="font-medium text-[#8a9bb8]">
                      {blog.authorTitle}
                    </p>
                  ) : null}
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[#8a9bb8] pt-0.5">
                    <span>{blog.date}</span>
                    <div className="w-[1px] h-4 bg-[#4D4D4D]" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {uniqueCategories.length > 0 ||
            blog.authorLinkedInUrl ||
            blog.authorXUrl ? (
              <div className="mt-auto flex w-full flex-wrap items-center justify-center gap-4 lg:justify-between">
                <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  {uniqueCategories.map((category) => (
                    <BlogCategoryPill key={category} category={category} />
                  ))}
                </div>
                <AuthorSocialLinks
                  linkedinUrl={blog.authorLinkedInUrl}
                  xUrl={blog.authorXUrl}
                  authorName={blog.author}
                />
              </div>
            ) : null}
          </div>

          {blog.image && (
            <Image
              src={blog.image}
              width={511}
              height={311}
              alt={blog.title}
              unoptimized={cmsImageNeedsUnoptimized(blog.image)}
              className="rounded-xl w-full max-w-[511px] h-auto shrink-0"
            />
          )}
        </div>

        <p className="text-sm sm:text-base font-normal text-justify text-[#c8d4ea]">
          {blog.description}
        </p>
      </div>

      <hr className="w-full h-[1px] bg-[#DCDCE0]" />
      {blog.mainContent?.trim() ? (
        <CmsBlogContent
          content={blog.mainContent}
          scrollRootRef={scrollRootRef}
          layoutOffset={layoutOffset}
        />
      ) : (
        <BlogContents />
      )}
      {uniqueTags.length > 0 ? (
        <div className="flex w-full flex-wrap items-center justify-start gap-2">
          {uniqueTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#1E2B47] bg-[#0D1425] px-3 py-1.5 text-xs font-medium text-[#A7B7D9]"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <hr className="w-full h-[1px] bg-[#DCDCE0]" />
      {previewMode ? (
        <PreviewCommentsPlaceholder />
      ) : blog.id ? (
        <BlogComments postId={blog.id} initialComments={comments} />
      ) : null}
      <hr className="w-full h-[1px] bg-[#DCDCE0]" />
      <RelatedBlog />
    </div>
  );
}

function AuthorSocialLinks({
  linkedinUrl,
  xUrl,
  authorName,
}: {
  linkedinUrl?: string;
  xUrl?: string;
  authorName: string;
}) {
  if (!linkedinUrl && !xUrl) {
    return null;
  }

  const iconButtonClass =
    'inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24FF8E]';

  return (
    <div className="flex items-center justify-center gap-3 lg:justify-end">
      {linkedinUrl ? (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${authorName} on LinkedIn`}
          className={`${iconButtonClass} bg-[#0A66C2] text-white shadow-[0_4px_14px_rgba(10,102,194,0.35)] hover:bg-[#004182]`}
        >
          <LinkedInMark />
        </a>
      ) : null}
      {xUrl ? (
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${authorName} on X`}
          className={`${iconButtonClass} bg-white text-black shadow-[0_4px_14px_rgba(255,255,255,0.12)] hover:bg-[#e8e8e8]`}
        >
          <XMark />
        </a>
      ) : null}
    </div>
  );
}

function LinkedInMark() {
  return (
    <span className="text-[15px] font-bold leading-none tracking-[-0.03em]">
      in
    </span>
  );
}

function XMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5"
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function PreviewCommentsPlaceholder() {
  return (
    <section className="w-full rounded-2xl border border-dashed border-[#2A3B61] bg-[#0B1220]/70 px-6 py-8 text-center">
      <p className="text-sm font-medium text-[#A7B7D9]">Comments</p>
      <p className="mt-2 text-sm text-[#7D8FB3]">
        Comments are hidden in preview and appear after the post is published.
      </p>
    </section>
  );
}
