"use client"

import Image, { type StaticImageData } from "next/image"
import { useState, useRef, useEffect } from "react"

interface Contributor {
  img: string | StaticImageData
  name: string
  role: string
  description: string
  linkedin: string
}

interface Props {
  contributors: Contributor[]
  linkedin: string
}

export default function ContributorsSection({ contributors, linkedin }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const chunkArray = (arr: Contributor[], size: number) => {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }

  const mobileGroups = chunkArray(contributors, 4)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const slideWidth = container.offsetWidth
      const newSlide = Math.round(scrollLeft / slideWidth)
      setCurrentSlide(newSlide)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current
    if (!container) return

    const slideWidth = container.offsetWidth
    container.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    })
  }

  return (
    <section className="w-full px-4 py-8">
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {contributors.map((item, index) => (
          <ContributorCard key={index} item={item} linkedin={linkedin} />
        ))}
      </div>
      <div
        ref={scrollContainerRef}
        className="sm:hidden overflow-x-auto snap-x snap-mandatory -mx-4 px-4 hide-scrollbar"
      >

        <div className="flex gap-6">
          {mobileGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex-shrink-0 w-full snap-center grid grid-cols-2 gap-4">
              {group.map((item, index) => (
                <ContributorCard key={index} item={item} linkedin={linkedin} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {mobileGroups.length > 1 && (
        <div className="sm:hidden flex justify-center gap-3 mt-6">
          {mobileGroups.map((_, index) => (
            <div
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${index === currentSlide ? "w-[52px] bg-[#24FF8E]" : "w-3 bg-gray-500 hover:bg-gray-300"
                }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

const ContributorCard = ({ item, linkedin }: { item: Contributor; linkedin: string }) => {
  return (
    <div className="group relative w-full flex flex-col items-center gap-3">
      <div className="relative w-full aspect-square max-w-[190px] mx-auto bg-white rounded-[30px] overflow-hidden">
        <Image
          src={item.img || "/placeholder.svg"}
          width={190}
          height={190}
          className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
          alt={item.name}
        />
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-[30px] p-2 bg-[#191C2980] backdrop-blur-md text-[10px] w-full text-white text-center 
            opacity-0 scale-y-0 origin-bottom transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-y-100"
        >
          {item.description}
        </div>
      </div>

      <div className="text-center w-full min-h-[60px] flex flex-col justify-start">
        <div className="flex justify-center items-center gap-2">
          <a
            href={item.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${item.name} on LinkedIn`}
            className="flex-shrink-0"
          >
            <Image src={linkedin || "/placeholder.svg"} alt="linkedin" width={20} height={20} />
          </a>
          <h3 className="text-sm sm:text-base font-normal truncate max-w-[120px] sm:max-w-[160px]">{item.name}</h3>
        </div>
        <h4 className="text-xs text-muted-foreground text-center mt-1 line-clamp-2">{item.role}</h4>
      </div>
    </div>
  )
}
