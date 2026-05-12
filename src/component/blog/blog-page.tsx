import Image from 'next/image';
import BlogComments from './blog-comments';
import BlogContents from './blog-contents';
import RelatedBlog from './related-blog';
import ProjectSection from './project-section';
import type { Blog } from '@/data/mockBlog';
import type { BlogComment } from '@/lib/cms-comments';

interface BlogPageProps {
  blog: Blog;
  comments: BlogComment[];
}

export default function BlogPage({ blog, comments }: BlogPageProps) {
  return (
    <div className="w-full min-h-screen flex flex-col gap-16 md:gap-24 justify-center items-center px-4 sm:px-8 md:px-[90px] py-[175px]">
      <div className="w-full flex flex-col gap-8 md:gap-12">
        <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-6">
          <div className="w-full lg:w-fit h-auto lg:h-[311px] flex flex-col justify-between items-center lg:items-start text-center lg:text-left gap-6">
            <h1 className="text-[32px] sm:text-[40px] md:text-[49px] text-white font-medium leading-tight">
              {blog.title}
            </h1>

            <div className="w-full flex flex-col sm:flex-row justify-between items-center lg:items-start gap-6">
              <div className="flex flex-col gap-6">
                <div className="flex justify-center sm:justify-start items-center gap-3 w-fit">
                  <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] bg-blue-500 rounded-full" />
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <p className="font-medium">{blog.author}</p>
                    <p className="font-medium">Managing Partner</p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-[#4D4D4D]">
                      <span>{blog.date}</span>
                      <div className="w-[1px] h-4 bg-[#4D4D4D]" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full p-2 h-fit rounded-[51px] border border-[#2E4778] flex justify-center items-center text-[#2E4778] text-sm">
                  {blog.category}
                </div>
              </div>
              <div className="hidden lg:flex w-[108px] h-full justify-center items-end">
                Socials
              </div>
            </div>
          </div>

          {blog.image && (
            <Image
              src={blog.image}
              width={511}
              height={311}
              alt={blog.title}
              className="rounded-xl w-full max-w-[511px] h-auto"
            />
          )}
        </div>

        <p className="text-sm sm:text-base font-normal text-justify">
          {blog.description}
        </p>
      </div>

      <hr className="w-full h-[1px] bg-[#DCDCE0]" />
      <BlogContents />
      <hr className="w-full h-[1px] bg-[#DCDCE0]" />
      {blog.id ? (
        <BlogComments postId={blog.id} initialComments={comments} />
      ) : null}
      <hr className="w-full h-[1px] bg-[#DCDCE0]" />
      <RelatedBlog />
      <ProjectSection />
    </div>
  );
}
