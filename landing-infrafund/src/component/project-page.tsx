import { Project } from '@/types/types'
import React from 'react'
import solarpanel from "@/../public/image/solarpanel.jpg"
import ProjectCard from './ui/ProjectCard'

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
    ]
    return (
        <div className='flex flex-col justify-center items-center gap-16 bg-red-500'>
            <div className='flex flex-col justify-center items-center gap-4 text-white'>
                <h1 className='text-[42px] font-bold'>Open NetZero Funds</h1>
                <h3 className='text-xl font-normal'>Open NetZero Funds</h3>
            </div>
            <div className='grid grid-cols-3 gap-6'>
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
            <div className='w-full h-fit flex justify-center items-center'>
                <button className="bg-transparent border border-gray-600 hover:border-gray-400 text-white px-8 py-3 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:bg-opacity-50 mt-10">
                    Load More Projects
                </button>
            </div>
        </div>
    )
}
