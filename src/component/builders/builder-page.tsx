"use client"
import React, { useState } from 'react'
import projectbg from "@/../public/svg/project-bg.svg"
import Image from 'next/image'
import BlockchainDiagram from './blockchain-diagram'
import BuilderFeature from './builder-feature'
import { faqs } from '@/constants/builderData'

export default function BuilderPage() {
    const [openId, setOpenId] = useState<string | null>("financial-return")

    const toggleFaq = (id: string) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <>
            <div className='w-full h-fit flex flex-col justify-center items-center'>
                {/* HERO */}
                <div className="w-full h-[900px] relative flex justify-start items-center overflow-hidden 
                      max-lg:h-auto max-lg:py-20 max-md:flex-col max-md:text-center max-md:px-6 max-sm:h-auto max-sm:py-12">
                    <div className='space-y-12 absolute z-10 px-[90px] max-md:static max-md:px-6 max-md:text-center'>
                        <h1
                            className="text-[64px] font-bold max-md:text-4xl"
                            style={{
                                background: "linear-gradient(273.15deg, #FFFFFF -9.61%, #5C5C5C 142.04%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Stop Pitching Banks.<br />
                            Start Building Your Future
                        </h1>
                        <h2 className='text-2xl text-white font-normal max-md:text-base'>
                            InfraFund provides the full-stack toolkit to fund your NetZero project,<br className='max-md:hidden' />
                            from tokenisation to global distribution.
                        </h2>
                        <div className='w-[288px] h-12 bg-green-400 flex justify-center items-center text-black font-medium mx-auto max-md:w-[200px] max-md:h-10'>
                            Start Your Project Application
                        </div>
                    </div>
                    <div
                        className="absolute right-1 w-[803px] h-[803px] rounded-[52px] -z-10 max-md:relative max-md:w-full max-md:h-[400px]"
                        style={{
                            backgroundImage: `
                                linear-gradient(270.67deg, rgba(0, 0, 0, 0) 59.3%, #000000 99.38%), 
                                url('/image/builders-hero.png')
                            `,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            zIndex: 0,
                        }}
                    />
                </div>

                {/* BLOCKCHAIN SECTION */}
                <div className="min-h-screen w-full overflow-hidden mt-10 relative flex justify-center items-center py-20 px-10 rounded-3xl max-md:px-4 max-md:py-10">
                    <Image
                        src={projectbg}
                        alt="project-bg"
                        className="absolute left-0 top-0 bottom-0 w-full h-full object-cover -z-10"
                    />
                    <div className="w-full max-w-[1400px] px-[90px] max-md:px-4">
                        <BlockchainDiagram />
                    </div>
                </div>

                {/* BUILDER FEATURE */}
                <BuilderFeature />

                {/* FAQ */}
                <div className="py-24 flex flex-col justify-center items-center gap-6 max-md:py-12">
                    <h2 className="text-[42px] text-white font-bold max-md:text-[28px]">Builders FAQ</h2>
                    <div className="space-y-4 w-[834px] max-lg:w-[90%] max-md:w-full max-md:px-4">
                        {faqs.map((faq) => {
                            const isOpen = openId === faq.id
                            return (
                                <div key={faq.id} className="border border-slate-700 rounded-lg bg-slate-800/50 overflow-hidden transition-all">
                                    <button
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full flex items-center justify-between px-6 py-6 text-left transition-colors hover:text-slate-200 max-md:px-4 max-md:py-4"
                                    >
                                        <span className="text-lg font-medium max-md:text-base">{faq.question}</span>
                                        <svg
                                            className={`w-5 h-5 transition-transform duration-500 ease-out ${isOpen ? "rotate-180" : "rotate-0"}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    <div className={`transition-all duration-500 ease-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                        <div className="px-6 pb-6 text-slate-300 leading-relaxed max-md:px-4 max-md:text-sm">{faq.answer}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="w-full py-36 flex flex-col justify-center items-center gap-20 max-md:py-16 max-md:gap-10">
                    <h2 className="text-5xl font-bold text-white max-md:text-3xl text-center">Ready to Accelerate Your Funding?</h2>
                    <button className="w-[250px] h-12 flex justify-center items-center bg-[#24FF8E] text-black max-md:w-[160px] max-md:h-10 text-sm font-semibold">
                        Apply to list your project
                    </button>
                </div>
            </div>
        </>
    )
}
