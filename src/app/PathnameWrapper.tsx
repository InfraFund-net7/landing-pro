"use client";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/component/header";
import Hero from "@/component/hero";
import PartnersSection from "@/component/partner";
import { useFadeInScroll } from "@/hooks/useFadeInScroll";

export default function HeaderHeroWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFadeInScroll();

  useEffect(() => {
    if (mounted) {
      console.log("%c[GSAP] Wrapper Mounted, activating FadeIn", "color: violet");
    }
  }, [mounted]);


  if (!mounted) return null;

  if (pathname !== "/") {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  return (
    <>
      <div className="relative w-full h-screen sm:h-[90vh] md:h-screen overflow-hidden bg-[url('/image/hero-home.png')] bg-no-repeat bg-cover">
        <div className="relative z-10 flex flex-col w-full h-full">
          <div className="relative z-50">
            <Header />
          </div>
          <Hero />
          <div className="relative z-10 border-t border-white w-full h-[100px] sm:h-[120px] md:h-[136px] backdrop-blur-[5px] sm:backdrop-blur-[6px] md:backdrop-blur-[7px]">
            <PartnersSection />
          </div>
        </div>
      </div>

      <main className="w-full flex flex-col">
        <section className="fade-in">{children}</section>
      </main>
    </>
  );
}
