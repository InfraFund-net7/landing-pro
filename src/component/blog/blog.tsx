import { Search } from 'lucide-react';
import React from 'react';
import BlogCard from './blog-card';
import BlogCategoryPills from './blog-category-pills';
import { DEFAULT_BLOG_CATEGORIES } from '@/constants/blogCategories';
import type { BlogListItem } from '@/lib/cms-posts';
import type { CmsSitePage } from '@/lib/cms-site-pages';

type BlogProps = {
  cmsPosts?: BlogListItem[];
  cmsPage?: CmsSitePage | null;
};

export default function Blog({ cmsPosts = [], cmsPage = null }: BlogProps) {
  const heading = cmsPage?.hero?.heading || cmsPage?.title || 'Insight';
  const subheading = cmsPage?.hero?.subheading || '';
  const cmsCategoryItems =
    cmsPage?.blocks.find((block) => block.blockType === 'feature-grid')
      ?.items ?? [];
  const categoryLabels: string[] =
    cmsCategoryItems.length > 0
      ? cmsCategoryItems
          .map((item) => String(item.title ?? '').trim())
          .filter(Boolean)
      : [...DEFAULT_BLOG_CATEGORIES];
  return (
    <div className="w-full min-h-screen flex flex-col gap-16 md:gap-24 justify-center items-center px-4 sm:px-8 md:px-[90px] py-[175px]">
      <div
        className="hidden md:block w-[1000px] h-[588px] rounded-full absolute -z-10 top-[10%] left-1/2 -translate-x-1/2"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 100%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)',
          filter: 'blur(400px)',
        }}
      />
      <div className="w-full max-w-[832px] flex flex-col justify-center items-center gap-8 text-center">
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <h1 className="text-[48px] sm:text-[72px] md:text-[106px] text-white font-medium">
            {heading}
          </h1>
          {subheading ? (
            <p className="text-white/80 text-base md:text-lg max-w-3xl">
              {subheading}
            </p>
          ) : null}

          <div className="flex w-full items-center gap-2 rounded-full bg-[#EEF2F0] px-4 py-3 text-black sm:px-5 sm:py-4">
            <Search
              size={20}
              className="shrink-0 cursor-pointer text-[#5D5D5D]"
            />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#5D5D5D]/80 sm:text-base"
              placeholder="Search"
            />
          </div>
          <BlogCategoryPills categories={categoryLabels} />
        </div>
        <div
          className="hidden md:block w-[1000px] h-[588px] rounded-full absolute -z-10 bottom-[10%] left-1/2 -translate-x-1/2"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 100%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)',
            filter: 'blur(400px)',
          }}
        />
      </div>
      <div
        className=" grid w-full gap-6 justify-center items-start 
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-[90px]
  overflow-hidden"
      >
        {cmsPosts.map((blog, index) => (
          <div key={index} className="w-full max-w-[400px] min-w-0 fade-in">
            <BlogCard
              image={blog.image}
              slug={blog.slug}
              date={blog.date}
              readTime={blog.readTime}
              title={blog.title}
              description={blog.description}
            />
          </div>
        ))}
        {cmsPosts.length === 0 ? (
          <div className="text-white/70 text-center col-span-full py-8">
            No published posts yet. Add posts in Payload admin to populate this
            page.
          </div>
        ) : null}
      </div>
    </div>
  );
}
