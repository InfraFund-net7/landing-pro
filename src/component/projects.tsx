"use client"
import ProjectsSlider from "./ProjectsSlider"
import Image from "next/image"
import projectbg from "@/../public/svg/project-bg.svg"
import { projects } from "@/constants/projectData"
import FadeInStagger from "./animations/FadeInStagger"


export default function InvestmentPlatform() {
    return (
        <FadeInStagger>
            <div className="min-h-screen overflow-hidden mt-10 relative mb-15">
                <Image src={projectbg} alt="project-bg" className=" absolute left-0 top-0 bottom-0 -z-10" />
                <div className="z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                    <h2 className="text-[42px] lg:text-6xl font-bold text-white text-center mb-16 max-w-4xl">
                        Invest in the Future, Today
                    </h2>
                    <ProjectsSlider projects={projects} cardsPerSlide={3} />
                    <button className="bg-transparent border border-gray-600 hover:border-gray-400 text-white px-8 py-3 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:bg-opacity-50 mt-10">
                        Explore All Projects
                    </button>
                </div>
            </div>
        </FadeInStagger>
    )
}
