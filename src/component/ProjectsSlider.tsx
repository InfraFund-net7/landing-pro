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

  // Slice projects for current slide
  const visibleProjects = projects.slice(
    currentSlide * cardsPerSlide,
    currentSlide * cardsPerSlide + cardsPerSlide
  );

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full flex justify-center items-center gap-6">
        <ChevronLeft
          size={40}
          className="text-gray-400 hover:text-white cursor-pointer transition"
          onClick={prevSlide}
        />

        <div className="w-full overflow-hidden">
          <div
            className="grid grid-cols-3 gap-6 transition-all duration-700"
            style={{ justifyItems: "start" }}
          >
            {visibleProjects.map((project) => (
              <div key={project.id} style={{ width: `${cardWidth}px` }}>
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
            className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
              i === currentSlide
                ? "w-[52px] bg-[#24FF8E]"
                : "w-3 bg-gray-500 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
