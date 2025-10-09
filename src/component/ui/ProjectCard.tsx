"use client"
import { Project } from "@/types/types"
import Image from "next/image"

interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        group relative w-[403px] h-[577px] flex-shrink-0 rounded-[50px] 
        overflow-hidden shadow-lg mr-6
        cursor-pointer transition-transform duration-500
      "
    >
      <div
        className="w-[109px] h-[35px] rounded-[84px] bg-white/50 backdrop-blur-[6px] absolute top-6 left-6 z-50 flex justify-center items-center"
      >
        <h3 className="text-sm text-black font-bold">
          {project.category}
        </h3>
      </div>
      <Image
        src={project.image}
        alt={project.title}
        className="
          w-full h-full object-cover absolute top-0 left-0
          transition-transform duration-700 ease-in-out
          group-hover:scale-105
        "
      />
      <div
        className="
          absolute bottom-0 w-full 
          bg-[#C4C4C466] backdrop-blur-md shadow-md 
          p-6 
          h-[230px] 
          transition-all duration-500 ease-in-out
          group-hover:h-[245px] group-hover:backdrop-blur-lg
        "
      >
        <h3 className="text-xl font-semibold text-white mb-4">
          {project.title}
        </h3>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-gray-300">
            <span className="text-base font-normal">Funding Target:</span>
            <span className="text-white font-medium">{project.fundingTarget}</span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span className="text-base font-normal">Projected Return:</span>
            <span className="text-white font-medium">{project.projectedReturn}</span>
          </div>

          <div className="flex justify-center text-gray-300 gap-1 w-full items-center">
            <span className="text-sm font-normal">Funding Status:</span>
            <div className="w-full bg-white rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${project.fundingStatus}%` }}
              />
            </div>
            <span className="text-white font-medium">{project.fundingStatus}%</span>
          </div>

          <button
            className="
              opacity-0 translate-y-4
              group-hover:opacity-100 group-hover:translate-y-0
              mt-4 px-4 py-2 text-sm 
              text-emerald-500
              transition-all duration-500 ease-in-out
            "
          >
            See Project
          </button>
        </div>
      </div>
    </div>
  )
}
