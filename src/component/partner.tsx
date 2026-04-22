'use client';
import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { partners } from '@/data/partners';
import Image from 'next/image';
import gsap from 'gsap';

export default function PartnersSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);
  const totalImages =
    partners.filter((p) => p.name !== 'CompaniesHouse').length * 2;

  const filteredPartners = partners.filter((p) => p.name !== 'CompaniesHouse');

  const calculateSetWidth = useCallback(() => {
    if (!firstSetRef.current) return 0;
    return firstSetRef.current.getBoundingClientRect().width;
  }, []);

  const handleImageLoad = () => {
    setImagesLoadedCount((prev) => prev + 1);
  };

  useLayoutEffect(() => {
    if (imagesLoadedCount < totalImages || !sliderRef.current) return;

    let tween: gsap.core.Tween | null = null;

    const initAnimation = () => {
      const setWidth = calculateSetWidth();
      if (setWidth <= 0) {
        setTimeout(initAnimation, 50);
        return;
      }

      tween = gsap.to(sliderRef.current, {
        x: `-${setWidth}px`,
        duration: 60,
        ease: 'linear',
        repeat: -1,
        paused: false,
      });
    };

    initAnimation();

    const handleMouseEnter = () => tween?.pause();
    const handleMouseLeave = () => tween?.resume();

    const slider = sliderRef.current;
    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    const resizeObserver = new ResizeObserver(() => {
      if (tween) {
        tween.kill();
        initAnimation();
      }
    });

    if (firstSetRef.current) {
      resizeObserver.observe(firstSetRef.current);
    }

    return () => {
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      if (tween) tween.kill();
    };
  }, [imagesLoadedCount, calculateSetWidth, totalImages]);

  return (
    <section className="w-full bg-[#00000066] py-8 px-2 sm:px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          className="flex flex-nowrap"
          ref={sliderRef}
          style={{ willChange: 'transform' }}
        >
          <div
            ref={firstSetRef}
            className="flex gap-6 sm:gap-8 md:gap-10 flex-shrink-0"
            aria-hidden="true"
          >
            {filteredPartners.map((partner, index) => (
              <div
                key={`set1-${index}`}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out flex-shrink-0"
              >
                <Image
                  src={partner.logo || '/placeholder.svg'}
                  alt={partner.alt}
                  width={100}
                  height={32}
                  className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                  loading="eager"
                  onLoad={handleImageLoad}
                  unoptimized
                />
              </div>
            ))}
          </div>
          <div className="flex gap-6 sm:gap-8 md:gap-10 flex-shrink-0">
            {filteredPartners.map((partner, index) => (
              <div
                key={`set2-${index}`}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out flex-shrink-0"
              >
                <Image
                  src={partner.logo || '/placeholder.svg'}
                  alt={partner.alt}
                  width={100}
                  height={32}
                  className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                  loading="eager"
                  onLoad={handleImageLoad}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
