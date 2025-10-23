import { blogs } from '@/data/blog'
import React from 'react'
import BlogCard from './blog-card'

export default function RelatedBlog() {
    return (
        <div className='w-full flex flex-col justify-center items-start gap-8 md:gap-12'>
            <span className='text-3xl text-white sm:text-4xl md:text-5xl font-bold '>
                Related Articles
            </span>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
                {blogs.slice(0, 3).map((blog, index) => (
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
        </div>
    )
}
