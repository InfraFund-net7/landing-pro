'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const steps = [
    {
      id: 1,
      title: 'AI-Driven Digital Twin',
      desc: `Our "secret sauce." We create a dynamic virtual model of every project, providing live performance data and predictive risk analysis to de-risk your investment.`,
      border: 'rounded-tl-[200px] rounded-tr-[20px] rounded-b-[20px]',
      img: 'ai-digital.jpg',
    },
    {
      id: 2,
      title: 'RWA Tokenization',
      desc: 'We use enterprise-grade, compliance-aware token standards to convert illiquid physical assets into liquid, tradable digital securities.',
      border:
        'rounded-tr-[20px] rounded-tl-[200px] rounded-br-[200px] rounded-bl-[20px]',
      img: 'rwa-tokenization.jpg',
    },
    {
      id: 3,
      title: 'DAO Governance',
      desc: 'We are building a future where project governance is decentralized. Token holders can vote on key decisions, turning investors into true project advocates.',
      border: 'rounded-l-[200px] rounded-r-[20px]',
      img: 'radical-transparency.jpg',
    },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setFade(false);

      const t = setTimeout(() => {
        setCurrentStep((prev) => (prev === steps.length ? 1 : prev + 1));
        setFade(true);
      }, 300);

      return () => clearTimeout(t);
    }, 10000);

    return () => clearInterval(interval);
  }, [autoPlay, steps.length]);

  // Indicator movement
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
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [currentStep]);

  const activeStep = steps.find((s) => s.id === currentStep);

  return (
    <div className="w-full min-h-[220px] flex flex-col justify-center items-center px- mb-5 sm:px-[90px] py-10">
      <div className="flex flex-col justify-center items-center gap-2 mb-10 text-center">
        <h2 className="text-xl sm:text-2xl md:text-[42px] text-white font-bold tracking-tight">
          Powered by Radical Transparency
        </h2>
        <h2 className="text-sm sm:text-base md:text-xl text-gray-300 font-normal max-w-2xl">
          Our technology unlocks trust, efficiency, and accessibility for green
          finance.
        </h2>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-10">
        <div className="w-full lg:w-[767px]">
          <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
            <div
              className="flex justify-between items-end mb-5 gap-1"
              ref={containerRef}
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            >
              {steps.map((step, idx) => (
                <button
                  key={step.id}
                  ref={(el) => {
                    buttonRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    setFade(false);
                    setTimeout(() => {
                      setCurrentStep(step.id);
                      setFade(true);
                    }, 300);
                  }}
                  className={`flex-1 text-xs sm:text-sm md:text-lg font-medium transition-all duration-300 
                                        ${currentStep === step.id ? 'text-white scale-[1.05]' : 'text-gray-500'}
                                        truncate`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* INDICATOR BAR */}
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="absolute top-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                style={{
                  width: `${indicator.width}px`,
                  left: `${indicator.left}px`,
                  transition:
                    'left 0.45s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s ease',
                }}
              />
            </div>

            {/* DESCRIPTION */}
            <p
              className={`mt-5 text-gray-200 text-sm sm:text-base md:text-xl leading-relaxed transition-opacity duration-500 
                                ${fade ? 'opacity-100' : 'opacity-0'}`}
            >
              {activeStep?.desc}
            </p>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
          className={`w-full lg:w-[408px] h-[300px] lg:h-[458px] bg-cover bg-center transition-all duration-700 ${activeStep?.border}`}
          style={{ backgroundImage: `url(/image/${activeStep?.img})` }}
        />
      </div>
    </div>
  );
}
