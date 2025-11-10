'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useFadeInScroll = () => {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll<HTMLElement>('.fade-in');

      elements.forEach((el) => {
        if (el.hasAttribute('data-fade-initialized')) return;
        el.setAttribute('data-fade-initialized', 'true');

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
              start: 'top bottom-=50',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);
};