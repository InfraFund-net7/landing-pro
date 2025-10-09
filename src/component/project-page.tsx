"use client";
import { Project } from "@/types/types";
import React, { useState, useEffect, useRef } from "react";
import solarpanel from "@/../public/image/solarpanel.jpg";
import ProjectCard from "./ui/ProjectCard";
import { ChevronLeft } from "lucide-react";

export default function ProjectPage() {
  const projects: Project[] = [
    {
      id: 1,
      category: "Solar Energy",
      title: "Solar Home California, USA",
      fundingTarget: "$18M",
      projectedReturn: "6.5%",
      fundingStatus: 68,
      image: solarpanel,
    },
    {
      id: 2,
      category: "Wind Energy",
      title: "North Sea Wind Farm, Denmark",
      fundingTarget: "$25M",
      projectedReturn: "7%",
      fundingStatus: 52,
      image: solarpanel,
    },
    {
      id: 3,
      category: "Solar Energy",
      title: "Solar Rooftops, UK",
      fundingTarget: "$15M",
      projectedReturn: "6.2%",
      fundingStatus: 62,
      image: solarpanel,
    },
    {
      id: 4,
      category: "Solar Energy",
      title: "Solar Home California, USA",
      fundingTarget: "$18M",
      projectedReturn: "6.5%",
      fundingStatus: 68,
      image: solarpanel,
    },
    {
      id: 5,
      category: "Wind Energy",
      title: "North Sea Wind Farm, Denmark",
      fundingTarget: "$25M",
      projectedReturn: "7%",
      fundingStatus: 52,
      image: solarpanel,
    },
    {
      id: 6,
      category: "Solar Energy",
      title: "Solar Rooftops, UK",
      fundingTarget: "$15M",
      projectedReturn: "6.2%",
      fundingStatus: 62,
      image: solarpanel,
    },
  ];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  type TabName = "Overview" | "Financials" | "Technical" | "Documents";
  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const handleBack = () => {
    setSelectedProject(null);
  };
  const tabContent: Record<TabName, string> = {
    Overview: `The North Sea Wind Project by WindNetZero is one of the largest
offshore wind farms in Europe, designed to generate over 500,000 MWh of clean
energy annually. By displacing fossil fuel usage, this project will help reduce
250,000 tons of CO₂ emissions each year, making a measurable impact on achieving
NetZero goals.`,

    Financials: `This project has a total investment size of £350M with expected annual returns
of 8-12%. The financing structure includes a mix of equity and debt, with secured
revenue through long-term Power Purchase Agreements.`,

    Technical: `The project utilizes advanced 14MW offshore wind turbines with a total capacity
of 1.2GW. It features smart-grid integration and AI-powered maintenance prediction
to ensure optimal performance and minimal downtime.`,

    Documents: `You can access all official project documents including feasibility studies,
environmental reports, and investment decks in this section.`,
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
    <div className="w-full min-h-screen text-white transition-colors duration-700 ease-in-out">
      {selectedProject ? (
        <div className="w-full h-screen flex flex-col justify-center items-center text-center relative">

          <div
            ref={bgRef}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              backgroundImage: bgImage ? `url(${bgImage})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: bgImage ? 1 : 0,
            }}
          />
          <div className="w-full h-full flex flex-col justify-start items-center bg-black/40 p-10 gap-16 px-[90px] py-44 relative z-10 animate-fadeIn">
            <div className="w-full h-fit flex justify-start items-center gap-2">
              <ChevronLeft
                onClick={handleBack}
                size={50}
                className="cursor-pointer text-white hover:text-[#24FF8E] transition-colors"
              />
              <h1 className="text-[42px] font-bold">{selectedProject.title}</h1>
            </div>

            <div
              className="w-[618px] h-[617px] bg-black/60 rounded-[50px] p-12 flex flex-col gap-24"
              style={{
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Navigation Tabs */}
              <div className="flex justify-center items-center gap-4 w-fit h-fit">

                <div className="w-full h-fit flex justify-start items-center gap-6">
                  {tabs.map((tab) => (
                    <span
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-base text-white cursor-pointer transition-all ${activeTab === tab
                        ? "font-bold text-[#24FF8E]"
                        : "font-normal hover:font-bold hover:text-[#24FF8E]"
                        }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <p className="text-lg text-white text-left leading-relaxed">
                {tabContent[activeTab]}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-end items-center gap-16 min-h-screen animate-fadeIn py-[179px]">
          <div className="flex flex-col justify-center items-center gap-4 py-16">
            <h1 className="text-[42px] font-bold">Open NetZero Funds</h1>
            <h3 className="text-xl font-normal">Open NetZero Funds</h3>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} onClick={() => setSelectedProject(project)}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <div className="w-full h-fit flex justify-center items-center">
            <button className="bg-transparent border border-gray-600 hover:border-gray-400 text-white px-8 py-3 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:bg-opacity-50 mt-10">
              Load More Projects
            </button>
          </div>
        </div>
      )}
    </div>
  );
}