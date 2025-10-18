"use client"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Header from "./header"
import Hero from "./hero"
import PartnersSection from "./partner"

export default function HeaderHeroWrapper({ children }: { children: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const pathname = usePathname()
  const [, setHasWatched] = useState<boolean | null>(null)

  useEffect(() => {
    const watched = localStorage.getItem("heroVideoWatched") === "true"
    setHasWatched(watched)

    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      if (watched) {
        video.currentTime = video.duration
        video.pause()
      } else {
        video.play().catch((error) => {
          console.error("Video autoplay failed:", error)
        })
      }
    }

    const handleVideoEnd = () => {
      video.pause()
      localStorage.setItem("heroVideoWatched", "true")
      setHasWatched(true)
    }

    if (video.readyState >= 1) {
      handleLoadedMetadata()
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata)
    }

    video.addEventListener("ended", handleVideoEnd)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleVideoEnd)
    }
  }, [])

  if (pathname !== "/") {
    return (
      <>
        <Header />
        {children}
      </>
    )
  }

  return (
    <>
      <div className="relative w-full h-[1024px] sm:h-[900px] md:h-[1024px] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          muted
          playsInline
          preload="metadata"
          poster="/video/infra-hero-poster.jpg"
        >
          <source src="/video/infra-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 flex flex-col w-full h-full">
          <div className="relative z-50">
            <Header />
          </div>
          <div className="flex-1 relative z-10">
            <Hero />
          </div>
          <div className="relative z-10 border-t border-white w-full h-[100px] sm:h-[120px] md:h-[136px] backdrop-blur-[5px] sm:backdrop-blur-[6px] md:backdrop-blur-[7px]">
            <PartnersSection />
          </div>
        </div>
      </div>

      <div className="w-full">{children}</div>
    </>
  )
}
