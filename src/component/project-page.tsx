"use client";
import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "./ui/ProjectCard";
import { ChevronLeft } from "lucide-react";
import { Project } from "@/types/types";
import { projects } from "@/constants/projectData";
import { CustomButton } from "./ui/custom-button";
import FadeInStagger from "./animations/FadeInStagger";

export default function ProjectPage() {


  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  type TabName = "Overview" | "Financials" | "Technical" | "Documents";
  const [activeTab, setActiveTab] = useState<TabName>("Overview");

  const handleBack = () => setSelectedProject(null);

  const tabContent: Record<TabName, string> = {
    Overview: `The North Sea Wind Project by WindNetZero is one of the largest
offshore wind farms in Europe...`,
    Financials: `This project has a total investment size of £350M...`,
    Technical: `The project utilizes advanced 14MW offshore wind turbines...`,
    Documents: `You can access all official project documents...`,
  };

  const tabs: TabName[] = Object.keys(tabContent) as TabName[];

  useEffect(() => {
    if (selectedProject) {
      setTimeout(() => {
        setBgImage(selectedProject.image.src);
      }, 300);
    } else {
      setBgImage(null);
    }
  }, [selectedProject]);

  return (
    <FadeInStagger duration={0.4}>
      <div className="w-full min-h-screen text-white ">
        {selectedProject ? (
          <div className="relative flex flex-col justify-center items-center text-center w-full h-screen">
            <div
              ref={bgRef}
              className="absolute inset-0"
              style={{
                backgroundImage: bgImage ? `url(${bgImage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: bgImage ? 1 : 0,
              }}
            />
            <div className="relative z-10 top w-full h-full flex flex-col justify-start items-center bg-black/50 px-6 md:px-16 lg:px-28 py-20 gap-10 md:gap-16">
              <div className="flex items-center gap-3 w-full mt-[20%] md:mt-[7%]">
                <ChevronLeft
                  onClick={handleBack}
                  size={40}
                  className="cursor-pointer text-white hover:text-[#24FF8E] transition-colors"
                />
                <h1 className="text-2xl md:text-[42px] font-bold text-left">
                  {selectedProject.title}
                </h1>
              </div>

              <div
                className="bg-black/60 rounded-[30px] md:rounded-[50px] p-6 md:p-12 w-full max-w-[650px] flex flex-col gap-10 md:gap-24"
                style={{ backdropFilter: "blur(12px)" }}
              >
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                  {tabs.map((tab) => (
                    <span
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-sm md:text-base cursor-pointer transition-all ${activeTab === tab
                        ? "font-bold text-[#24FF8E]"
                        : "font-normal hover:text-[#24FF8E]"
                        }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>

                <p className="text-sm md:text-lg text-left leading-relaxed">
                  {tabContent[activeTab]}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-end items-center gap-10 md:gap-16 min-h-screen py-[179px]  px-4">
            <div className="flex flex-col justify-center items-center gap-2 md:gap-4 text-center">
              <h1 className="text-3xl md:text-[42px] font-bold">
                Open NetZero Funds
              </h1>
              <h3 className="text-base md:text-xl font-normal">
                Open NetZero Funds
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
              {projects.map((project) => (
                <div key={project.id} onClick={() => setSelectedProject(project)}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            <div className="w-full flex justify-center items-center">
              <CustomButton variant="outlined" className="w-fit px-6 md:px-8 py-2 md:py-3 rounded-lg transition-all duration-200 hover:bg-gray-800/50 mt-6 md:mt-10">
                Load More Projects
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </FadeInStagger>
  );
}