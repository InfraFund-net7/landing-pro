'use client';

import { timelineData } from '@/constants/TimelineData';
import { partners } from '@/data/partners';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Timeline component for the about us page
if (
  typeof window !== 'undefined' &&
  gsap &&
  !gsap.utils.checkPrefix('ScrollTrigger')
) {
  gsap.registerPlugin(ScrollTrigger);
}
export default function Timeline() {
  const [nodeStates, setNodeStates] = useState<number[]>(() => {
    const arr = new Array(timelineData.length).fill(0);
    arr[0] = 1;
    return arr;
  });

  const [lineProgress, setLineProgress] = useState<number[]>(() =>
    new Array(timelineData.length - 1).fill(0)
  );

  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.timeline-section');

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            duration: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 40%',
              scrub: true,
              toggleActions: 'play none none reverse',
            },
          }
        );

        if (index < timelineData.length - 1) {
          ScrollTrigger.create({
            trigger: item,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
            onUpdate: (self) => {
              setLineProgress((prev) => {
                const updated = [...prev];
                updated[index] = self.progress * 100;
                return updated;
              });
            },
          });
        }

        ScrollTrigger.create({
          trigger: item,
          start: 'top 70%',
          end: 'bottom 30%',
          onEnter: () => {
            setNodeStates((prev) => {
              const updated = [...prev];
              updated[index] = 1;
              return updated;
            });
          },
          onLeaveBack: () => {
            setNodeStates((prev) => {
              const updated = [...prev];
              updated[index] = 0;
              return updated;
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isQuarterLeft = (index: number) => index % 2 === 0;

  return (
    <div ref={containerRef} className="min-h-screen w-full py-10 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {timelineData.map((item, index) => {
            if (item.quarter === 'Today') return null;
            if (timelineData[index + 1]?.quarter === 'Today') return null;

            const progress = lineProgress[index] || 0;
            return (
              <div
                key={`line-${index}`}
                className="absolute left-1/2 -translate-x-1/2 w-0.5"
                style={{
                  top: `${(index * 100) / (timelineData.length - 1)}%`,
                  height: `${100 / (timelineData.length - 3.4)}%`,
                  background: `linear-gradient(to bottom, rgb(34, 197, 94) ${progress}%, rgb(209, 213, 219) ${progress}%)`,
                  transition: 'background 0.2s linear',
                }}
              />
            );
          })}

          {timelineData.map((item, index) => {
            const isGreen = nodeStates[index] === 1;
            const quarterLeft = isQuarterLeft(index);
            const isQ22025 = item.quarter === 'Q2 2025';

            return (
              <div
                key={index}
                ref={(el) => {
                  nodeRefs.current[index] = el;
                }}
                className="timeline-section relative mb-16 md:mb-32 last:mb-0"
              >
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 z-20 bg-[#0f172a]"
                  style={{
                    borderColor: isGreen
                      ? 'rgb(34, 197, 94)'
                      : 'rgb(209, 213, 219)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                    style={{
                      backgroundColor: isGreen
                        ? 'rgb(34, 197, 94)'
                        : 'rgb(255, 255, 255)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
                <div className="flex items-start gap-4 md:gap-8">
                  <div className="flex-1 pr-4 md:pr-8 max-w-full">
                    {quarterLeft ? (
                      <div className="flex flex-col gap-2 text-right">
                        <h3
                          className="text-lg md:text-[25px] font-medium leading-tight"
                          dangerouslySetInnerHTML={{ __html: item.quarter }}
                        />
                        <p
                          style={{
                            hyphens: 'auto',
                            textAlign: 'justify',
                            padding: 0,
                            margin: 0,
                          }}
                          className="text-sm text-white md:text-base font-normal"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 p-2 md:p-4">
                        <div
                          className={`flex ${
                            isQ22025
                              ? 'flex-col items-center'
                              : 'flex-wrap justify-center'
                          } gap-2 md:gap-4 w-full`}
                        >
                          {item.logos?.includes('UkParliamnet') && (
                            <div
                              key="ukparleman"
                              className="flex justify-center items-center p-2 md:p-4 w-full"
                            >
                              <Image
                                src={
                                  partners.find(
                                    (p) => p.name === 'UkParliamnet'
                                  )?.logo.src || '/placeholder.svg'
                                }
                                alt={
                                  partners.find(
                                    (p) => p.name === 'UkParliamnet'
                                  )?.alt || 'UK Parliament'
                                }
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="h-auto w-full max-w-[80px] md:max-w-[193px] max-h-8 md:max-h-20 object-contain"
                              />
                            </div>
                          )}

                          <div className="flex flex-wrap justify-center gap-2 md:gap-4 w-full">
                            {item.logos?.map((name, logoIndex) => {
                              if (name === 'UkParliamnet') return null;
                              const partner = partners.find(
                                (p) => p.name === name
                              );
                              if (!partner) return null;
                              return (
                                <div
                                  key={`${item.quarter}-${logoIndex}`}
                                  className="flex justify-center items-center p-1 md:p-4"
                                >
                                  <Image
                                    src={partner.logo.src || '/placeholder.svg'}
                                    alt={partner.alt}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="h-auto w-full max-w-[80px] md:max-w-[193px] max-h-8 md:max-h-20 object-contain"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 pl-4 md:pl-8 max-w-full">
                    {!quarterLeft ? (
                      <div className="flex flex-col gap-2 text-left">
                        <h3
                          className="text-lg md:text-[25px] font-medium"
                          dangerouslySetInnerHTML={{ __html: item.quarter }}
                        />
                        <p
                          style={{
                            hyphens: 'auto',
                            textAlign: 'justify',
                            padding: 0,
                            margin: 0,
                          }}
                          className="text-sm text-white md:text-base font-normal"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 md:gap-4 max-w-[410px] w-full h-fit mx-auto">
                        {item.logos?.map((name, logoIndex) => {
                          const partner = partners.find((p) => p.name === name);
                          if (!partner) return null;
                          return (
                            <div
                              key={`${item.quarter}-${logoIndex}`}
                              className="flex justify-center items-center w-full h-fit p-2 md:p-4"
                            >
                              <Image
                                src={partner.logo.src || '/placeholder.svg'}
                                alt={partner.alt}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="h-auto w-full max-w-[80px] md:max-w-full max-h-10 md:max-h-16 object-contain"
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
