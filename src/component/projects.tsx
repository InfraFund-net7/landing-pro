"use client"
import { Project } from "@/types/types"
import ProjectsSlider from "./ProjectsSlider"
import solarpanel from "@/../public/image/solarpanel.jpg"

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
]

export default function InvestmentPlatform() {
    return (
        <div className="min-h-screen overflow-hidden mt-10">
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
    )
}
