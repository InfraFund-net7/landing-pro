"use client"

import { Project } from "@/types/types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import ProjectCard from "./ui/ProjectCard"

interface ProjectsSliderProps {
  projects: Project[]
  cardsPerSlide?: number
  gap?: number
  cardWidth?: number
}

export default function ProjectsSlider({
  projects,
  cardsPerSlide = 3,
  gap = 20,
  cardWidth = 320,
}: ProjectsSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = Math.ceil(projects.length / cardsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="w-full max-w-7xl flex justify-center items-center gap-9">
      <ChevronLeft size={40} onClick={prevSlide} />
      <div className="w-full py-10 flex flex-col items-center overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (cardWidth + gap)}px)`,
            width: `${projects.length * (cardWidth + gap)}px`,
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      <ChevronRight size={40} onClick={nextSlide} />
    </div>
  )
}
