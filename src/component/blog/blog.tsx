import { Search } from 'lucide-react'
import React from 'react'
import BlogCard from './blog-card'
import { blogs } from '@/data/blog'
import FadeInStagger from '../animations/FadeInStagger'

export default function Blog() {
    return (
        <FadeInStagger single className='w-full min-h-screen flex flex-col gap-16 md:gap-24 justify-center items-center px-4 sm:px-8 md:px-[90px] py-[175px]'>
            <div className='w-full max-w-[832px] flex flex-col justify-center items-center gap-8 text-center'>
                <div className='w-full flex flex-col justify-center items-center gap-6'>
                    <h1 className='text-[48px] sm:text-[72px] md:text-[106px] text-white font-medium'>
                        Insight
                    </h1>

                    <div className='w-full p-3 sm:p-4 flex justify-start items-center bg-[#EEF2F0] rounded-2xl text-black gap-2'>
                        <Search size={20} className='cursor-pointer' />
                        <input
                            className='outline-none bg-transparent w-full text-sm sm:text-base'
                            placeholder='Search'
                        />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center w-full'>
                {blogs.map((blog, index) => (
                    <BlogCard
                        key={index}
                        image={blog.image}
                        slug={blog.slug}
                        date={blog.date}
                        readTime={blog.readTime}
                        title={blog.title}
                        description={blog.description}
                    />
                ))}
            </div>
        </FadeInStagger>
    )
}
