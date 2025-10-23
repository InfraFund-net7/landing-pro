"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    id: 1,
    quote: "What IntraFund is building will redefine how sustainable projects access capital.",
    name: "David Smith",
    title: "Advisor at Innovate UK",
    image: "/image/user-test.jpg",
  },
  {
    id: 2,
    quote: "IntraFund's approach is a game-changer for financing the NetZero transition.",
    name: "Luke Lang",
    title: "Co-founder of Crowdcube",
    image: "/image/user-test.jpg",
  },
  {
    id: 3,
    quote: "Partnering with IntraFund gives startups the credibility and resources they need to scale responsibly.",
    name: "Sarah Johnson",
    title: "Innovation Director at Microsoft for Startups",
    image: "/image/user-test.jpg",
  },
  {
    id: 4,
    quote: "The platform brings transparency and innovation to green investment like never before.",
    name: "Michael Brown",
    title: "Sustainability Expert at GreenTech",
    image: "/image/user-test.jpg",
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
        <ChevronLeft
          size={28}
          onClick={prevSlide}
          className="cursor-pointer text-gray-400 hover:text-white transition flex-shrink-0 hidden sm:block"
        />

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
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-gray-200 text-sm leading-relaxed font-normal mb-2">
                      “{t.quote}”
                    </p>
                    <h4 className="text-white font-medium text-sm">{t.name}</h4>
                    <p className="text-gray-400 text-xs">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ChevronRight
          size={28}
          onClick={nextSlide}
          className="cursor-pointer text-gray-400 hover:text-white transition flex-shrink-0 hidden sm:block"
        />
      </div>
    </div>
  );
}
