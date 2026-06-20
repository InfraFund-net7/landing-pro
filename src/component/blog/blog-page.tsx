import Image from 'next/image';
import linkedinIcon from '@/../public/svg/linkedin.svg';
import xIcon from '@/../public/svg/X.svg';
import { cmsImageNeedsUnoptimized } from '@/lib/cms-next-image';
import type { RefObject } from 'react';
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

  return (
    <div
      className={`w-full min-h-screen flex flex-col gap-16 md:gap-24 justify-center items-center px-4 sm:px-8 md:px-[90px] ${pagePadding}`}
    >
      <div className="w-full flex flex-col gap-8 md:gap-12">
        <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-6">
          <div className="w-full lg:w-fit h-auto lg:h-[311px] flex flex-col justify-between items-center lg:items-start text-center lg:text-left gap-6">
            <h1 className="text-[32px] sm:text-[40px] md:text-[49px] text-white font-medium leading-tight">
              {blog.title}
            </h1>

            {blog.categories?.length || blog.tags?.length ? (
              <PostTaxonomy
                categories={
                  blog.categories ?? (blog.category ? [blog.category] : [])
                }
                tags={blog.tags ?? []}
              />
            ) : null}

            <div className="w-full flex flex-col sm:flex-row justify-between items-center lg:items-start gap-6">
              <div className="flex flex-col gap-6">
                <div className="flex justify-center sm:justify-start items-center gap-3 w-fit">
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
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-[#8a9bb8]">
                      <span>{blog.date}</span>
                      <div className="w-[1px] h-4 bg-[#4D4D4D]" />
                      <span>{blog.readTime}</span>
                    </div>
                    <AuthorSocialLinks
                      linkedinUrl={blog.authorLinkedInUrl}
                      xUrl={blog.authorXUrl}
                      authorName={blog.author}
                      className="flex lg:hidden justify-center sm:justify-start pt-1"
                    />
                  </div>
                </div>
              </div>
              <AuthorSocialLinks
                linkedinUrl={blog.authorLinkedInUrl}
                xUrl={blog.authorXUrl}
                authorName={blog.author}
                className="hidden lg:flex w-[108px] h-full justify-center items-end"
              />
            </div>
          </div>

          {blog.image && (
            <Image
              src={blog.image}
              width={511}
              height={311}
              alt={blog.title}
              unoptimized={cmsImageNeedsUnoptimized(blog.image)}
              className="rounded-xl w-full max-w-[511px] h-auto"
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
  className = '',
}: {
  linkedinUrl?: string;
  xUrl?: string;
  authorName: string;
  className?: string;
}) {
  if (!linkedinUrl && !xUrl) {
    return null;
  }

  return (
    <div className={`gap-3 ${className}`}>
      {linkedinUrl ? (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${authorName} on LinkedIn`}
          className="inline-flex transition-opacity hover:opacity-80"
        >
          <Image src={linkedinIcon} alt="" width={20} height={20} />
        </a>
      ) : null}
      {xUrl ? (
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${authorName} on X`}
          className="inline-flex transition-opacity hover:opacity-80"
        >
          <Image src={xIcon} alt="" width={17} height={15} />
        </a>
      ) : null}
    </div>
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

function PostTaxonomy({
  categories,
  tags,
}: {
  categories: string[];
  tags: string[];
}) {
  const uniqueCategories = [...new Set(categories.filter(Boolean))];
  const uniqueTags = [...new Set(tags.filter(Boolean))];

  if (uniqueCategories.length === 0 && uniqueTags.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {uniqueCategories.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6b88]">
            Categories
          </span>
          {uniqueCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-[#2E4778] bg-[#102247]/50 px-3 py-1 text-xs font-medium text-[#93C5FD]"
            >
              {category}
            </span>
          ))}
        </div>
      ) : null}

      {uniqueTags.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6b88]">
            Tags
          </span>
          {uniqueTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#1E2B47] bg-[#0D1425] px-2.5 py-1 text-[11px] font-medium text-[#A7B7D9]"
            >
              #{tag.replace(/^#/, '')}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
