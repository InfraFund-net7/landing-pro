"use client";
import { Project } from "@/types/types";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        group relative w-[90vw] sm:w-[300px] md:w-[350px] lg:w-[403px] 
        h-[450px] md:h-[577px]
        flex-shrink-0 rounded-[30px] md:rounded-[50px] 
        overflow-hidden shadow-lg cursor-pointer 
        transition-transform duration-500
      "
    >
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-50">
        <div className="px-3 py-1 md:px-4 md:py-2 bg-white/50 backdrop-blur-md rounded-full">
          <h3 className="text-xs md:text-sm text-black font-bold">
            {project.category}
          </h3>
        </div>
      </div>

      <Image
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />

      <div
        className="
          absolute bottom-0 w-full bg-[#C4C4C466] backdrop-blur-md shadow-md 
          p-4 md:p-6 h-[180px] md:h-[230px]
          transition-all duration-500 ease-in-out
          group-hover:h-[200px] md:group-hover:h-[245px]
        "
      >
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-4">
          {project.title}
        </h3>

        <div className="space-y-1 text-xs md:text-sm">
          <div className="flex justify-between text-gray-300">
            <span>Funding Target:</span>
            <span className="text-white font-medium">
              {project.fundingTarget}
            </span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>Projected Return:</span>
            <span className="text-white font-medium">
              {project.projectedReturn}
            </span>
          </div>

          <div className="flex items-center gap-1 text-gray-300">
            <span className="text-xs">Funding Status:</span>
            <div className="w-full bg-white rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${project.fundingStatus}%` }}
              />
            </div>
            <span className="text-white text-xs font-medium">
              {project.fundingStatus}%
            </span>
          </div>

          <button
            className="
              opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0
              mt-2 md:mt-4 text-xs md:text-sm text-emerald-500 transition-all
            "
          >
            See Project
          </button>
        </div>
      </div>
    </div>
  );
}
