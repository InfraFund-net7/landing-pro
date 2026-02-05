'use client';
import ProjectsSlider from './ProjectsSlider';
import { projects } from '@/constants/projectData';
import { Project } from '@/types/types';
import { ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

export default function InvestmentPlatform() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  type TabName = 'Overview' | 'Financials' | 'Technical' | 'Documents';
  const [activeTab, setActiveTab] = useState<TabName>('Overview');

  const tabContent: Record<TabName, string> = {
    Overview: `The North Sea Wind Project by WindNetZero is one of the largest offshore wind farms in Europe...`,
    Financials: `This project has a total investment size of £350M...`,
    Technical: `The project utilizes advanced 14MW offshore wind turbines...`,
    Documents: `You can access all official project documents...`,
  };

  const tabs: TabName[] = Object.keys(tabContent) as TabName[];

  useEffect(() => {
    if (selectedProject) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || '0'));
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    }
  }, [selectedProject]);

  const modal = selectedProject && createPortal(
    <div
      className="fixed inset-0 z-[9999] w-screen h-dvh bg-black"
      onClick={() => setSelectedProject(null)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${selectedProject.image.src})` }}
      />
      <div
        className="relative z-10 w-full h-full text-white px-6 md:px-16 lg:px-28 py-20 flex flex-col gap-10 md:gap-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 w-full mt-[20%] md:mt-[7%]">
          <ChevronLeft
            onClick={() => setSelectedProject(null)}
            size={40}
            className="cursor-pointer text-white hover:text-[#24FF8E]"
          />
          <h1 className="text-2xl md:text-[42px] font-bold text-left">
            {selectedProject.title}
          </h1>
        </div>

        <div
          className="bg-black/60 rounded-[30px] md:rounded-[50px] p-6 md:p-12 max-w-[650px] w-full"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-6">
            {tabs.map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm md:text-base cursor-pointer ${activeTab === tab ? 'font-bold text-[#24FF8E]' : 'hover:text-[#24FF8E]'
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
    </div>,
    document.body
  );

  return (
    <>
      {modal}

      <div className="min-h-screen overflow-hidden relative mb-15">
        <div className="z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <div className="text-[42px] lg:text-6xl font-bold text-white text-center mb-16 max-w-4xl">
            Invest in the Future, Today
          </div>
          <div className="w-full">
            <ProjectsSlider
              projects={projects}
              cardsPerSlide={3}
              onSelectProject={setSelectedProject}
            />
          </div>
          <Link href="/project" className="bg-transparent border cursor-pointer border-gray-600 hover:border-gray-400 text-white px-8 py-3 rounded-lg mt-10">
            Explore All Projects
          </Link>
        </div>
      </div>
    </>
  );
}