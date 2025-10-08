"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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
  {
    id: 4,
    quote:
      "The platform brings transparency and innovation to green investment like never before.",
    name: "Michael Brown",
    title: "Sustainability Expert at GreenTech",
    image: UserTest,
  },
  {
    id: 5,
    quote:
      "A powerful way to support renewable projects while earning tangible returns.",
    name: "Laura Green",
    title: "Impact Investor",
    image: UserTest,
  },
  {
    id: 6,
    quote:
      "IntraFund connects visionaries with resources in an elegant, efficient way.",
    name: "Daniel Cooper",
    title: "Startup Mentor",
    image: UserTest,
  },
];

export default function UserCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;

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

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerSlide
  );

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="flex items-center justify-center gap-4 w-full">
        {/* دکمه قبلی */}
        <ChevronLeft
          size={32}
          onClick={prevSlide}
          className="cursor-pointer text-gray-400 hover:text-white transition"
        />

        {/* کارت‌ها */}
        <div className="flex justify-center items-stretch gap-6 w-full max-w-6xl">
          {visibleTestimonials.map((t) => (
            <div
              key={t.id}
              className="flex w-1/3 bg-[#191C2980] border border-gray-600 rounded-2xl p-5 gap-4 hover:bg-gray-700 hover:border-blue-400 transition-all duration-300"
            >
              <Image
                src={t.image}
                alt={t.name}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col gap-2">
                <p className="text-gray-200 text-sm leading-relaxed font-normal">
                  “{t.quote}”
                </p>
                <div>
                  <h4 className="text-white font-medium text-sm">{t.name}</h4>
                  <p className="text-gray-400 text-xs">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ChevronRight
          size={32}
          onClick={nextSlide}
          className="cursor-pointer text-gray-400 hover:text-white transition"
        />
      </div>
    </div>
  );
}
