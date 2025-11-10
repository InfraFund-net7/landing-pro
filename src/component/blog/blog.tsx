import { Search } from 'lucide-react';
import React from 'react';
import BlogCard from './blog-card';
import { blogcategories, blogs } from '@/data/blog';
import Image from 'next/image';

export default function Blog() {
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
            Insight
          </h1>

          <div className="w-full p-3 sm:p-4 flex justify-start items-center bg-[#EEF2F0] rounded-2xl text-black gap-2">
            <Search size={20} className="cursor-pointer" />
            <input
              className="outline-none bg-transparent w-full text-sm sm:text-base"
              placeholder="Search"
            />
          </div>
          <div className="flex flex-wrap justify-center items-center md:justify-center gap-4 w-full ">
            {blogcategories.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1 py-2 px-4 rounded-[51px] border w-fit h-fit"
                style={{ borderColor: item.color }}
              >
                {item.type === 'lucide' ? (
                  <item.icon size={16} color={item.color} />
                ) : (
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={16}
                    height={16}
                    style={{ objectFit: 'contain' }}
                  />
                )}
                <span
                  className="text-sm font-medium"
                  style={{ color: item.color }}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
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
        {blogs.map((blog, index) => (
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
      </div>
    </div>
  );
}
