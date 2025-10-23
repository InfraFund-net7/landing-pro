import React from 'react'
import solarpanel from "@/../public/image/solarpanel.jpg"
import { Project } from '@/types/types'
import ProjectCard from '../ui/ProjectCard'

export default function ProjectSection() {
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
    ]

    return (
        <div className='w-full flex flex-col justify-center items-start gap-8 md:gap-12'>
            <span className='text-3xl text-white sm:text-4xl md:text-5xl font-bold '>
                Invest in the Future, Today
            </span>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    )
}
