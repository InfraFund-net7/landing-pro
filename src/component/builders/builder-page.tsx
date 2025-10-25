"use client"
import React, { useState } from 'react'
import BlockchainDiagram from './blockchain-diagram'
import BuilderFeature from './builder-feature'
import { faqs } from '@/constants/builderData'
import { CustomButton } from '../ui/custom-button'
import FadeInStagger from '../animations/FadeInStagger'

export default function BuilderPage() {
    const [openId, setOpenId] = useState<string | null>("financial-return")

    const toggleFaq = (id: string) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <>
            <div className='w-full h-fit flex flex-col justify-center items-center py-[175px]'>
                <FadeInStagger
                    className="w-full h-[1024px] relative flex justify-start items-center overflow-hidden bg-[url('/image/builders-hero.jpg')] bg-cover bg-no-repeat max-lg:h-auto max-lg:py-20 max-md:flex-col max-md:text-center max-md:px-6 max-md:bg-none max-sm:h-auto max-sm:py-12"
                >

                    <div className='space-y-12 absolute z-10 px-[90px] max-md:static max-md:px-6'>
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
                        <CustomButton variant='filled' className='w-fit h-12 px-4 flex justify-center items-center text-sm sm:text-lg  rounded-lg '>
                            Start Your Project Application
                        </CustomButton>
                    </div>
                </FadeInStagger>
                <FadeInStagger single className="min-h-screen w-full overflow-hidden mt-10 relative flex justify-center items-center py-20 px-[90px] rounded-3xl max-md:px-4 max-md:py-10">
                    <div className="w-full">
                        <BlockchainDiagram />
                    </div>
                </FadeInStagger>
                <FadeInStagger>
                    <BuilderFeature />
                </FadeInStagger>
                <FadeInStagger className="py-24 flex flex-col relative justify-center items-center gap-6 max-md:py-12">
                    <div
                        className="absolute inset-0 rounded-full blur-[300px]"
                        style={{
                            background:
                                "radial-gradient(50% 50% at 50% 50%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)",
                        }}
                    />
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
                </FadeInStagger>
                <FadeInStagger>
                    <div className="w-full py-36 flex flex-col justify-center items-center gap-20 max-md:py-16 max-md:gap-10">
                        <h2 className="text-5xl font-bold text-white max-md:text-3xl text-center">Ready to Accelerate Your Funding?</h2>
                        <CustomButton variant='filled' className='w-fit h-12 px-4 flex justify-center items-center text-sm sm:text-lg rounded-lg '>
                            Apply to list your project
                        </CustomButton>
                    </div>
                </FadeInStagger>
            </div >
        </>
    )
}
