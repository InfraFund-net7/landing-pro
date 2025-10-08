"use client";

import { Project } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ProjectCard from "./ui/ProjectCard";

interface ProjectsSliderProps {
  projects: Project[];
  cardsPerSlide?: number;
  gap?: number;
  cardWidth?: number;
}

export default function ProjectsSlider({
  projects,
  cardsPerSlide = 3,
  gap = 20,
  cardWidth = 320,
}: ProjectsSliderProps) {
  const totalSlides = Math.ceil(projects.length / cardsPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const offset = -(currentSlide * (cardsPerSlide * (cardWidth + gap)));

  return (
    <div className="w-full max-w-7xl flex flex-col items-center gap-8">
      <div className="w-full flex justify-center items-center gap-6">
        <ChevronLeft
          size={40}
          className="text-gray-400 hover:text-white cursor-pointer transition"
          onClick={prevSlide}
        />

        <div className="w-full py-10 flex flex-col items-center overflow-hidden ">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(${offset}px)`,
              gap: `${gap}px`,
              width: `${projects.length * (cardWidth + gap)}px`,
            }}
          >
            {projects.map((project) => (
              <div key={project.id} style={{ flex: `0 0 ${cardWidth}px` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        <ChevronRight
          size={40}
          className="text-gray-400 hover:text-white cursor-pointer transition"
          onClick={nextSlide}
        />
      </div>

      <div className="flex gap-3 mt-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${i === currentSlide
                ? "w-[52px] bg-[#24FF8E]"
                : "w-3 bg-gray-500 hover:bg-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
