"use client";

import { useEffect, useState, useRef } from "react";
import FadeInStagger from "./animations/FadeInStagger";

interface CounterData {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

const counters: CounterData[] = [
  { value: 15, label: "Supported Chains" },
  { value: 50, label: "Integrated Projects" },
  { value: 874, label: "TVL", prefix: "$", suffix: "M" },
  { value: 90, label: "Yieldcoin Market Share", suffix: "%" },
];

function useAnimatedCounter(targetValue: number, shouldAnimate: boolean, duration = 2000) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated || !shouldAnimate) return;

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(targetValue * easeOutQuart);
      setCurrentValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
        setHasAnimated(true);
      }
    };

    const timer = setTimeout(() => animate(), 300);
    return () => clearTimeout(timer);
  }, [targetValue, duration, hasAnimated, shouldAnimate]);

  return currentValue;
}

function CounterItem({
  data,
  index,
  shouldAnimate,
}: {
  data: CounterData;
  index: number;
  shouldAnimate: boolean;
}) {
  const animatedValue = useAnimatedCounter(data.value, shouldAnimate, 2000 + index * 200);

  return (
    <div className="text-left w-full">
      <div className="text-3xl sm:text-5xl md:text-[72px] font-medium text-white mb-1 md:mb-2">
        {data.prefix || ""}
        {animatedValue.toLocaleString()}
        {data.suffix || ""}
      </div>
      <div className="text-gray-400 text-sm md:text-2xl">{data.label}</div>
    </div>
  );
}

export function AnimatedCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) setIsVisible(true);
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    );

    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <FadeInStagger>
      <div
        ref={counterRef}
        className="w-full py-10 px-6 sm:px-10 md:h-[390px] md:px-20 grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12 justify-items-center items-center"
      >
        {counters.map((counter, index) => (
          <CounterItem key={index} data={counter} index={index} shouldAnimate={isVisible} />
        ))}
      </div>
    </FadeInStagger>
  );
}
