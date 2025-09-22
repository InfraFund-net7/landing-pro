"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import UserTest from "@/../public/image/user-test.jpg";
const testimonials = [
  {
    id: 1,
    quote:
      "What IntraFund is building will redefine how sustainable projects access capital.",
    name: "David Smith",
    title: "Advisor at Innovate UK",
    image: UserTest,
  },
  {
    id: 2,
    quote:
      "IntraFund's approach is a game-changer for financing the NetZero transition.",
    name: "Luke Lang",
    title: "Co-founder of Crowdcube",
    image: UserTest,
  },
  {
    id: 3,
    quote:
      "Partnering with IntraFund gives startups the credibility and resources they need to scale responsibly.",
    name: "Sarah Johnson",
    title: "Innovation Director at Microsoft for Startups",
    image: UserTest,
  },
];

export default function UserCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const getExtendedTestimonials = () => {
    return [...testimonials, ...testimonials, ...testimonials];
  };

  return (
    <div className="relative w-full px-7">
      <div className="flex items-center justify-center gap-6">
        <ChevronLeft size={24} onClick={prevSlide} className="cursor-pointer" />
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-600 ease-in-out"
            style={{
              transform: `translateX(-${
                (currentIndex + testimonials.length) * 320
              }px)`,
              width: `${getExtendedTestimonials().length * 320}px`,
            }}
          >
            {getExtendedTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex w-[403px] h-[172px] bg-[#191C2980] rounded-2xl border border-gray-600 p-4 justify-between gap-4 hover:bg-gray-700 hover:border-blue-400 transition-all duration-300"
              >
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="rounded-full w-12 h-12"
                />
                <div className="flex flex-col gap-2 ">
                  <p className="text-gray-200 text-sm leading-relaxed font-normal">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div>
                    <h4 className="text-white font-medium text-xs">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-[10px]">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ChevronRight
          size={24}
          onClick={nextSlide}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
