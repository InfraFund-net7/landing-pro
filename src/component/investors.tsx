"use client"
import React, { Component, useState } from 'react'
import radicaltransparency from "@/../public/svg/radical-transparency.svg"
import futureliquidity from "@/../public/svg/future-liquidity.svg"
import directimpact from "@/../public/svg/direct-impact.svg"
import Image from 'next/image'
import { ChartNoAxesCombined, ChevronDown, SearchCheck, Wallet } from 'lucide-react'
import InvestmentPlatform from './projects'
import AnimatedChevrons from './ui/animated-chevrons'
export default function Investors() {
    const [openId, setOpenId] = useState<string | null>("financial-return")

    const toggleFaq = (id: string) => {
        setOpenId(openId === id ? null : id)
    }

    const infradiffrence = [
        {
            icon: radicaltransparency,
            title: "Radical Transparency",
            description: "Our AI-Driven Digital Twin provides a live, verifiable view into project performance.",
        },
        {
            icon: directimpact,
            title: "Direct Access & Impact",
            description: "Go beyond donations. Invest directly in the projects you believe in and become a true stakeholder in their success.",
        },
        {
            icon: futureliquidity,
            title: "Future Liquidity",
            description: "We are building the infrastructure to turn illiquid, long-term assets into tradable digital tokens on a secure secondary market",
        },
    ]
    const invest = [
        {
            icon: Wallet,
            title: "Connect Your Wallet",
            description: "Securely connect your Web3 wallet in seconds"
        },
        {
            icon: SearchCheck,
            title: "Discover & Diligence",
            description: "Browse projects and review their performance data via the Digital Twin dashboard."
        },
        {
            icon: ChartNoAxesCombined,
            title: "Invest & Track",
            description: "Invest directly with crypto or fiat and monitor your portfolio in your personal dashboard."
        },
    ]
    const faqs = [
        {
            id: "financial-return",
            question: "Is this a financial return?",
            answer:
                "Lorem ipsum dolor sit amet consectetur. Viverra at a adipiscing non eleifend iaculis morbi. Morbi diam ultrices adipiscing tellus tortor tellus. Amet sit et tellus rhoncus lobortis pretium in mauris. Pretium dictum a dictumst et. Eu eu a sed gravida. Magna habitasse id mattis fringilla augue nisl volutpat nec nisl. Pharetra sagittis aliquam bibendum sit sodales dolor vestibulum tortor.",
        },
        {
            id: "project-vetting",
            question: "How are projects vetted?",
            answer:
                "Our comprehensive vetting process includes thorough due diligence, technical audits, team background checks, and market analysis to ensure only the highest quality projects are selected for investment opportunities.",
        },
        {
            id: "risks",
            question: "What are the risks?",
            answer:
                "All investments carry inherent risks including market volatility, regulatory changes, technology risks, and potential loss of capital. We recommend diversifying your portfolio and only investing what you can afford to lose.",
        },
        {
            id: "web3-wallet",
            question: "What is a Web3 wallet?",
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
                    <div className='w-[823px] h-fit  flex flex-col justify-center items-start gap-12 text-white'>
                        <h1 className='text-[64px] font-bold'>Invest Directly in the
                            Future of Our Planet</h1>
                        <h2 className='text-2xl font-normal'>Access transparent, liquid, and high-impact green infrastructure projects, <br /> powered by the security of the blockchain</h2>
                        <button className='w-[154px] h-12 bg-[#24FF8E] flex justify-center items-center'>
                            Get Started
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
            <div className='w-full h-fit flex flex-col justify-center items-center  px-[90px] py-12 gap-24'>
                <h2 className='text-[42px] text-white font-bold'>The InfraFund Difference</h2>
                <div className='w-full h-[700px] border border-[#5D5D5D] rounded-[50px] flex justify-center items-center'>
                    {infradiffrence.map((item, index) => (
                        <div
                            key={index}
                            className={`w-1/3 h-full ${index !== infradiffrence.length - 1 ? 'border-r border-[#5D5D5D]' : ''} flex flex-col justify-between items-center px-6 pt-[80px] py-28 text-center text-white`}
                        >
                            <div className='flex flex-col gap-12 justify-center items-center'>
                                <Image src={item.icon} alt={item.title} width={100} height={100} />
                                <h2 className='text-4xl font-bold'>{item.title}</h2>
                            </div>
                            <p className='text-2xl font-normal'>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-10 p-10">
                <h2 className="text-5xl font-bold text-white">How to Invest</h2>
                <div className="flex flex-col gap-8 justify-center items-center">
                    {invest.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="flex flex-col items-center gap-6 ">
                                <div className="flex flex-col items-center gap-4 text-center max-w-md">
                                    <div className='flex justify-center items-center gap-4 text-white'>
                                        <Icon className="w-11 h-11" />
                                        <h3 className="text-[32px] font-medium">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-white/90 text-2xl font-normal">{item.description}</p>
                                </div>
                                {index < invest.length - 1 && <AnimatedChevrons />}
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Projects */}
            <InvestmentPlatform />
            {/* FAQ */}
            <div className='py-24 flex flex-col justify-center items-center'>
                <h2 className='text-[42px] text-white font-bold'>Investor FAQ</h2>
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
            <div className='w-full py-36 flex flex-col justify-center items-center gap-20'>
                <h2 className='text-5xl font-bold text-white'>Ready to build your impact portfolio?</h2>
                <button className='w-[154px] h-12 flex justify-center items-center bg-[#24FF8E] text-black'>
                    Get Started
                </button>
            </div>
        </div>
    )
}
