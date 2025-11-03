'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useFadeInScroll = () => {
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.getAll().forEach((t) => t.kill());

      const elements = gsap.utils.toArray<HTMLElement>('.fade-in');

      if (!elements.length) return;

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              toggleActions: 'play none none reverse',
              markers: false,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};
