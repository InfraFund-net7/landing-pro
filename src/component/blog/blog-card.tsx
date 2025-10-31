'use client'

import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

interface BlogCardProps {
    slug: string
    image?: string | StaticImageData
    date: string
    readTime: string
    title: string
    description: string
}

export default function BlogCard({
    slug,
    image,
    date,
    readTime,
    title,
    description,
}: BlogCardProps) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/blog/${slug}`)
    }

    return (
        <div
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()  // فضا رو prevent scroll کن
                    handleClick()
                }
            }}
            className="
                w-full flex flex-col h-full 
                py-4 gap-4
                transition-all duration-500 ease-out 
                hover:scale-[1.03] active:scale-[0.98] 
                hover:shadow-xl hover:-translate-y-1
                rounded-2xl cursor-pointer 
                outline-none focus-visible:ring-2 focus-visible:ring-blue-500  // accessibility
            "
        >
            <div className="w-full flex-1 relative rounded-2xl overflow-hidden min-h-[200px]"> 
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (min-width: 768px) 33vw, 400px" 
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                )}
            </div>

            <div className="w-full flex flex-col gap-3 px-2 sm:px-3 flex-0"> 
                <div className="flex items-center text-white text-xs sm:text-sm">
                    {date}
                    <hr className="mx-2 w-1 h-1 bg-white rounded-full" /> 
                    {readTime}
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-medium leading-tight line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-sm sm:text-base font-normal line-clamp-3">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}