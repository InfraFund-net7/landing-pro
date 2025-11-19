'use client';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/component/header';
import Hero from '@/component/hero';
import PartnersSection from '@/component/partner';
import { useFadeInScroll } from '@/hooks/useFadeInScroll';

export default function HeaderHeroWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFadeInScroll();

  useEffect(() => {
    if (mounted) {
      console.log(
        '%c[GSAP] Wrapper Mounted, activating FadeIn',
        'color: violet'
      );
    }
  }, [mounted]);

  if (!mounted) return null;

  if (pathname !== '/') {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  return (
    <>
      <div
        className="relative w-full h-screen sm:h-[90vh] md:h-screen overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-[url('/image/hero-second.jpg')] bg-no-repeat bg-cover"
          style={{
            backgroundPosition: 'center 60%',
            opacity: 0.6, 
          }}
        />
        <div className="relative z-10 flex flex-col w-full h-full">
          <div className="relative z-50">
            <Header />
          </div>
          <Hero />
          <div className="relative z-10 border-t border-white w-full h-[100px] sm:h-[120px] md:h-[12%] backdrop-blur-[3px] sm:backdrop-blur-[4px] md:backdrop-blur-[5px]">
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
