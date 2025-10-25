"use client"
import { ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Header from "@/component/header"
import Hero from "@/component/hero"
import PartnersSection from "@/component/partner"
import FadeInStagger from "@/component/animations/FadeInStagger"

export default function HeaderHeroWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (pathname !== "/") {
    return (
      <>
        <Header />
        {children}
      </>
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <div className="relative w-full h-[1024px] sm:h-[900px] md:h-[1024px] overflow-hidden bg-[url('/image/hero-home.png')] bg-no-repeat bg-cover">
        <div className="relative z-10 flex flex-col w-full h-full">
          <div className="relative z-50">
            <Header />
          </div>
          <div className="flex-1 relative z-10">
            <Hero />
          </div>
          <FadeInStagger single className="relative z-10 border-t border-white w-full h-[100px] sm:h-[120px] md:h-[136px] backdrop-blur-[5px] sm:backdrop-blur-[6px] md:backdrop-blur-[7px]">
            <PartnersSection />
          </FadeInStagger>
        </div>
      </div>

      {children}
    </>
  )
}
