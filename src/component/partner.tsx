'use client';
import { useRef, useEffect, useState } from 'react';
import { partners } from '@/data/partners';
import Image from 'next/image';
import gsap from 'gsap';

export default function PartnersSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null); // New ref for exact set width
  const [isLoaded, setIsLoaded] = useState(false); // Track image loads for robust init

  useEffect(() => {
    if (!sliderRef.current || !firstSetRef.current) return;

    const slider = sliderRef.current;
    let tween: gsap.core.Tween | null = null;

    const setupAnimation = () => {
      if (tween) tween.kill();
      if (!firstSetRef.current) return;

      // **THE FIX**: Measure EXACT width of one set (including internal gaps)
      const setWidth = firstSetRef.current.getBoundingClientRect().width;

      // Robustness: Retry if width is 0 (images not loaded yet)
      if (setWidth === 0 && !isLoaded) {
        setTimeout(setupAnimation, 100);
        return;
      }

      tween = gsap.to(slider, {
        x: `-${setWidth}px`, // Animate exactly one set's width
        duration: 40, // Faster loop (adjust as needed; 100s was too slow for seamlessness)
        ease: 'linear',
        repeat: -1, // Infinite loop — now truly seamless!
      });
    };

    // Initial setup after a tick (for DOM readiness)
    const timeoutId = setTimeout(setupAnimation, 0);

    const handleMouseEnter = () => tween?.pause();
    const handleMouseLeave = () => tween?.resume();

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', setupAnimation);

    return () => {
      clearTimeout(timeoutId);
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', setupAnimation);
      if (tween) tween.kill();
    };
  }, [isLoaded]); // Re-run when all images are loaded

  const filteredPartners = partners.filter((p) => p.name !== 'CompaniesHouse');

  // Track loads for all images in the first set
  const handleImageLoad = () => {
    // Simple counter? Or just set true after all (you can enhance with a counter if many logos)
    setIsLoaded(true);
  };

  return (
    <section className="w-full bg-[#00000066] py-8 px-2 sm:px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex justify-center items-center h-full">
        <div
          className="flex flex-shrink-0" // No gap here — gaps are per-set now
          ref={sliderRef}
        >
          {/* First set — ref for measurement */}
          <div
            ref={firstSetRef}
            className="flex gap-6 sm:gap-8 md:gap-10 flex-shrink-0"
          >
            {filteredPartners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out flex-shrink-0"
              >
                <Image
                  src={partner.logo || '/placeholder.svg'}
                  alt={partner.alt}
                  width={100}
                  height={32}
                  className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                  loading="lazy"
                  onLoad={handleImageLoad} // Track loads
                />
              </div>
            ))}
          </div>
          {/* Second set — identical, no ref needed */}
          <div className="flex gap-6 sm:gap-8 md:gap-10 flex-shrink-0">
            {filteredPartners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out flex-shrink-0"
              >
                <Image
                  src={partner.logo || '/placeholder.svg'}
                  alt={partner.alt}
                  width={100}
                  height={32}
                  className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                  loading="lazy"
                  onLoad={handleImageLoad}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}