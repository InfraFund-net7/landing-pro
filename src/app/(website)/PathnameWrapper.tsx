'use client';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/component/header';
import Hero from '@/component/hero';
import HeroTrustStats from '@/component/HeroTrustStats';
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
      <div className="relative w-full min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/image/hero-updated-design.png')] bg-no-repeat bg-cover"
          style={{
            backgroundPosition: 'center 60%',
            opacity: 0.85,
          }}
        />
        <div className="relative z-10 flex flex-col w-full">
          <div className="relative z-50">
            <Header />
          </div>
          <Hero />
          <HeroTrustStats />
        </div>
      </div>

      <main className="w-full flex flex-col">
        <section className="fade-in">{children}</section>
      </main>
    </>
  );
}
