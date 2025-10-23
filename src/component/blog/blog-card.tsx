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
            onKeyDown={(e) => { if (e.key === 'Enter') handleClick() }}
            className="
                w-full sm:w-[320px] md:w-[404px] 
                flex flex-col justify-center items-center py-4 gap-4
                transition-all duration-500 ease-out 
                hover:scale-[1.03] hover:shadow-xl hover:-translate-y-1
                rounded-2xl cursor-pointer outline-none
            "
        >
            <div className="w-full h-[220px] sm:h-[260px] md:h-[306px] relative rounded-2xl overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 404px"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                )}
            </div>

            <div className="w-full h-fit flex px-2 sm:px-3 flex-col gap-3 justify-center items-start">
                <div className="flex items-center text-white text-xs sm:text-sm">
                    {date}
                    <hr className="mx-2 w-1 h-1 bg-black rounded-full" />
                    {readTime}
                </div>

                <div className="flex flex-col justify-center items-start gap-2 text-white">
                    <span className="text-lg sm:text-xl md:text-2xl font-medium leading-tight">{title}</span>
                    <span className="text-sm sm:text-base font-normal">{description}</span>
                </div>
            </div>
        </div>
    )
}
