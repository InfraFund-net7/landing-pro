"use client"
import React, { useState } from 'react'
import firstlevel from "@/../public/svg/first-level-works.svg"
import secondlevel from "@/../public/svg/second-level-works.svg.svg"
import thirdlevel from "@/../public/svg/third-level-works.svg.svg"
import Image from 'next/image'
export default function Builders() {
    const [openId, setOpenId] = useState<string | null>("fees")

    const toggleFaq = (id: string) => {
        setOpenId(openId === id ? null : id)
    }
    const Works = [
        {
            icon: firstlevel,
            title: "Onboard in Days, Not Months",
            description: `Our "Project Onboarding Wizard" guides you through creating a professional, data-rich fundraising page.`,
        },
        {
            icon: secondlevel,
            title: "Onboard in Days, Not Months",
            description: `Our "Project Onboarding Wizard" guides you through creating a professional, data-rich fundraising page.`,
        },
        {
            icon: thirdlevel,
            title: "Access a Global Capital Pool",
            description: `Our "Project Onboarding Wizard" guides you through creating a professional, data-rich fundraising page.`,
        },
    ]
    const faqs = [
        {
            id: "fees",
            question: "What are the fees?",
            answer:
                "Lorem ipsum dolor sit amet consectetur. Viverra at a adipiscing non eleifend iaculis morbi. Morbi diam ultrices adipiscing tellus tortor tellus. Amet sit et tellus rhoncus lobortis pretium in mauris. Pretium dictum a dictumst et. Eu eu a sed gravida. Magna habitasse id mattis fringilla augue nisl volutpat nec nisl. Pharetra sagittis aliquam bibendum sit sodales dolor vestibulum tortor.",
        },
        {
            id: "project-support",
            question: "What types of projects do you support?",
            answer:
                "Our comprehensive vetting process includes thorough due diligence, technical audits, team background checks, and market analysis to ensure only the highest quality projects are selected for investment opportunities.",
        },
        {
            id: "utility-token",
            question: "What is a utility token?",
            answer:
                "All investments carry inherent risks including market volatility, regulatory changes, technology risks, and potential loss of capital. We recommend diversifying your portfolio and only investing what you can afford to lose.",
        },
        {
            id: "compliance",
            question: "How do you ensure compliance?",
            answer:
                "A Web3 wallet is a digital wallet that allows you to store, send, and receive cryptocurrencies and interact with decentralized applications (dApps). It gives you full control over your digital assets and private keys.",
        },
    ]
    return (
        <div className='flex flex-col justify-center items-center gap-12'>
            <div
                className='w-full h-[1024px] flex justify-between items-center '
            >
                <div className='w-1/2 h-full  flex justify-end items-center px-[90px]'>
                    <div className='w-[832px] h-fit  flex flex-col justify-center items-start gap-12 text-white'>
                        <h1 className='text-[60px] font-bold'>Stop Pitching Banks.
                            Start Building Your Future</h1>
                        <h2 className='text-2xl font-normal'>InfraFund provides the full-stack toolkit to fund your NetZero project,<br />from tokenisation to global distribution.</h2>
                        <button className='w-[288px] h-12 bg-[#24FF8E] flex justify-center items-center'>
                            Start Your Project Application
                        </button>
                    </div>
                </div>
                <div
                    className='w-[832px] h-full'
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 50%), url("/image/investor-hero.png")`,
                        backgroundPosition: "45% center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                </div>
            </div>
            <div className='w-full px-[90px] py-60 h-fit flex flex-col justify-center items-center gap-20'>
                <h3 className='text-white text-5xl font-bold'>How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1600px] gap-6">
                    {Works.map((item, index) => (
                        <div
                            key={index}
                            className={`${Works.length % 2 !== 0 && index === Works.length - 1
                                ? "md:col-span-2"
                                : ""
                                } w-full h-[329px] flex justify-center items-start flex-col bg-[#14171F] text-white rounded-[40px] p-12 gap-8`}
                        >
                            <div className="flex flex-col gap-6 items-start text-center">
                                <Image src={item.icon} alt={item.title} width={89} height={89} />
                                <h3 className="text-3xl font-medium">{item.title}</h3>
                            </div>
                            <p className="text-xl font-normal text-start">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full h-fit px-[90px] flex flex-col justify-center items-center gap-28'>
                <div className='w-full flex flex-col gap-6 justify-center items-center text-white'>
                    <h3 className='text-[42px] font-bold'>
                        &quot;Secret Sauce&quot; Feature
                    </h3>
                    <h4 className='text-2xl font-normal'>
                        Your Project, Upgraded with an AI-Driven Digital
                    </h4>
                </div>
                <div className='w-full h-fit flex justify-center items-center gap-40'>
                    <p className='text-2xl font-normal text-white w-[602px]'>
                        Explain the core benefit: radical transparency.<br />
                        The Digital Twin provides your investors with <br /> real-time, verifiable data on project performance,<br /> building unprecedented trust and de-risking the<br /> entire process.
                    </p>
                    <div className="w-[492px] h-[458px] bg-[url('/image/builder-secret.jpg')] rounded-tl-[200px] rounded-tr-[20px] bg-cover bg-no-repeat bg-center" />
                </div>
            </div>
            <div className='py-24 flex flex-col justify-center items-center gap-12'>
                <h2 className='text-[42px] text-white font-bold'>Developer FAQ</h2>
                <div className="space-y-4 w-[834px]">
                    {faqs.map((faq) => {
                        const isOpen = openId === faq.id

                        return (
                            <div
                                key={faq.id}
                                className="border border-slate-700 rounded-lg bg-slate-800/50 overflow-hidden transition-all duration-500 ease-out hover:bg-slate-800/80 hover:border-slate-600 hover:scale-[1.01] hover:shadow-xl hover:shadow-slate-900/50"
                            >
                                <button
                                    onClick={() => toggleFaq(faq.id)}
                                    className="w-full flex items-center justify-between px-6 py-6 text-left transition-colors duration-300 hover:text-slate-200"
                                >
                                    <span className="text-lg font-medium">{faq.question}</span>
                                    <svg
                                        className={`w-5 h-5 transition-transform duration-500 ease-out ${isOpen ? "rotate-180" : "rotate-0"
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div
                                    className={`transition-all duration-500 ease-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="px-6 pb-6 text-slate-300 leading-relaxed">{faq.answer}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-20'>
                <h2 className='text-5xl font-bold text-white'>Ready to Accelerate Your Funding?</h2>
                <button className='w-[288px] h-12 bg-[#24FF8E] flex justify-center items-center'>
                    Apply to list your project
                </button>
            </div>
        </div>
    )
}
