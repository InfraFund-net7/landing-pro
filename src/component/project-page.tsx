'use client';
import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './ui/ProjectCard';
import { ChevronLeft } from 'lucide-react';
import { Project } from '@/types/types';
import { projects } from '@/constants/projectData';
import { CustomButton } from './ui/custom-button';

export default function ProjectPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [hideAnimation, setHideAnimation] = useState(false);
  type TabName = 'Overview' | 'Financials' | 'Technical' | 'Documents';
  const [activeTab, setActiveTab] = useState<TabName>('Overview');

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

  const handleLoadMoreClick = () => {
    setHideAnimation(true);
    setTimeout(() => {
      setShowLoadMore(false);
    }, 300);
  };

  return (
    <div className="w-full min-h-screen text-white ">
      {selectedProject ? (
        <div className="relative flex flex-col justify-center items-center text-center w-full h-screen">
          <div
            ref={bgRef}
            className="absolute inset-0"
            style={{
              backgroundImage: bgImage ? `url(${bgImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
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
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                {tabs.map((tab) => (
                  <span
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm md:text-base cursor-pointer transition-all ${
                      activeTab === tab
                        ? 'font-bold text-[#24FF8E]'
                        : 'font-normal hover:text-[#24FF8E]'
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
        <div className="flex relative flex-col justify-end items-center gap-10 md:gap-16 min-h-screen py-[179px]  sm:px-4">
          <div
            className="hidden md:block w-[1000px] h-[588px] rounded-full absolute -z-10  bottom-[40%] left-1/2 -translate-x-1/2"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 100%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)',
              filter: 'blur(400px)',
            }}
          />
          <div className="flex flex-col justify-center items-center gap-2 md:gap-4 text-center">
            <h1 className="text-3xl md:text-[42px] font-bold">
              Open NetZero Funds
            </h1>
            <h3 className="text-base md:text-xl font-normal">
              Contribute in NetZero Transition while Benefiting from them
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
            {showLoadMore && (
              <button
                onClick={handleLoadMoreClick}
                className={`bg-transparent cursor-pointer border border-gray-600 hover:border-gray-400 text-white px-8 py-3 rounded-lg mt-10 transition-opacity duration-300 ${
                  hideAnimation ? 'opacity-0' : 'opacity-100'
                }`}
              >
                Load More Projects
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
