'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    quote:
      'The ability to automate milestone payments through smart contracts is a massive step forward. It will eliminate payment delays, improve our cash flow, and allow us to focus on what we do best: building.',
    name: 'Test',
    title: 'EPC Contractor, Exeter',
    image: '/image/user-test.jpg',
  },
  {
    id: 2,
    quote:
      "For the first time, the AI-Driven Digital Twin gives us real-time, trusted data on a project's performance. This level of transparency de-risks the investment and gives us the confidence to back the next generation of green assets.",
    name: 'Luke Lang',
    title: 'Angel Investor, England',
    image: '/image/user-test.jpg',
  },
  {
    id: 3,
    quote:
      "InfraFund's platform is set to revolutionise how we finance renewable energy projects. Slashing funding time from years to weeks will accelerate our ability to deploy green infrastructure and help us reach our NetZero goals faster",
    name: 'Sarah Johnson',
    title: 'Renewable Energy Developer, UK',
    image: '/image/user-test.jpg',
  },
];

export default function UsersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const startX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerSlide(1);
      else if (window.innerWidth < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerSlide >= testimonials.length ? 0 : prev + itemsPerSlide
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerSlide < 0
        ? Math.max(testimonials.length - itemsPerSlide, 0)
        : prev - itemsPerSlide
    );
  };

  // --- touch support for mobile ---
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 50) prevSlide();
    if (diff < -50) nextSlide();
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 sm:gap-6 mt-12">
      <div className="flex items-center justify-center gap-2 md:gap-4 w-full px-2 sm:px-4">
        {/* <ChevronLeft
          size={28}
          onClick={prevSlide}
          className="cursor-pointer text-gray-400 hover:text-white transition flex-shrink-0 hidden sm:block"
        /> */}

        <div
          className="overflow-hidden w-full max-w-6xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out gap-4 md:gap-6"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerSlide}%)`,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-[#191C2980] border border-gray-700 rounded-2xl p-4 sm:p-6 hover:border-[#24FF8E] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center sm:text-left">
                  {/* <Image
                    src={t.image}
                    alt={t.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  /> */}
                  <div>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-normal mb-2">
                      “{t.quote}”
                    </p>
                    {/* <h4 className="text-white font-medium text-sm">{t.name}</h4> */}
                    <p className="text-gray-400 text-xs">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <ChevronRight
          size={28}
          onClick={nextSlide}
          className="cursor-pointer text-gray-400 hover:text-white transition flex-shrink-0 hidden sm:block"
        /> */}
      </div>
    </div>
  );
}
