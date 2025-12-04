"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function HeroSection() {
    const steps = [
        { id: 1, title: "AI-Driven Digital Twin", desc: "We are building a future where project governance is decentralized. Token holders can vote on key decisions, turning investors into true project advocates." },
        { id: 2, title: "RWA Tokenization", desc: "We are building a future where project governance is decentralized. Token holders can vote on key decisions, turning investors into true project advocates." },
        { id: 3, title: "DAO Governance", desc: "We are building a future where project governance is decentralized. Token holders can vote on key decisions, turning investors into true project advocates." },
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    const updateIndicatorToStep = (stepIndex: number) => {
        const container = containerRef.current;
        const btn = buttonRefs.current[stepIndex];
        if (!container || !btn) return;

        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        const width = btnRect.width;
        let left = btnRect.left - containerRect.left;

        const maxLeft = Math.max(0, containerRect.width - width);
        if (left < 0) left = 0;
        if (left > maxLeft) left = maxLeft;

        setIndicator({ left, width });
    };

    useLayoutEffect(() => {
        updateIndicatorToStep(currentStep - 1);
    }, [currentStep]);

    useEffect(() => {
        const onResize = () => updateIndicatorToStep(currentStep - 1);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [currentStep]);

    const activeStep = steps.find((s) => s.id === currentStep);

    return (
        <div className="w-full min-h-[220px] flex flex-col justify-center items-center px-4 sm:px-[90px] py-6 sm:py-10">
            <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 mb-6 sm:mb-8 text-center">
                <h2 className="text-xl sm:text-2xl md:text-[42px] text-[#F5F6F8] font-bold">
                    Powered by Radical Transparency
                </h2>
                <h2 className="text-sm sm:text-base md:text-xl text-[#F5F6F8] font-normal max-w-2xl">
                    Our technology unlocks trust, efficiency, and accessibility for green finance.
                </h2>
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
                <div className="w-full lg:w-[767px]">
                    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
                        <div
                            className="flex justify-between items-end mb-3 sm:mb-4 gap-1"
                            ref={containerRef}
                        >
                            {steps.map((step, idx) => (
                                <button
                                    key={step.id}
                                    ref={(el) => {
                                        buttonRefs.current[idx] = el;
                                    }}
                                    onClick={() => {
                                        setCurrentStep(step.id);
                                        setTimeout(() => updateIndicatorToStep(idx), 0);
                                    }}
                                    className={`flex-1 min-w-0 text-[10px] xs:text-xs sm:text-sm md:text-2xl font-medium transition-all duration-200 relative px-0.5 sm:px-1
                                        ${currentStep === step.id ? "text-white" : "text-gray-400"}
                                        truncate`}
                                >
                                    {step.title}
                                </button>
                            ))}
                        </div>
                        <div className="relative h-1 xs:h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                style={{
                                    width: `${indicator.width}px`,
                                    left: `${indicator.left}px`,
                                    transition: "left 0.45s cubic-bezier(0.16, 1, 0.3, 1), width 0.2s ease",
                                }}
                            />
                        </div>
                        <p className="mt-3 sm:mt-5 text-[#F5F6F8] text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed">
                            {activeStep?.desc}
                        </p>
                    </div>
                </div>
                <div className="w-full lg:w-[408px] h-[200px] xs:h-[250px] sm:h-[300px] lg:h-[458px] 
                                rounded-t-[30px] xs:rounded-t-[50px] lg:rounded-t-none 
                                lg:rounded-l-[200px] lg:rounded-r-[20px]
                                bg-[url('/image/radical-transparency.jpg')] bg-cover bg-center" />
            </div>
        </div>
    );
}