"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInStaggerProps {
    children: React.ReactNode;
    stagger?: number;
    y?: number;
    duration?: number;
    selector?: string;
    className?: string;
    single?: boolean; 
    once?: boolean; 
}

const FadeInStagger: React.FC<FadeInStaggerProps> = ({
    children,
    stagger = 0.15,
    y = 50,
    duration = 1,
    selector = "*",
    className = "",
    single = false,
    once = false,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!ref.current) return;

            if (single) {
                gsap.fromTo(
                    ref.current,
                    { y, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ref.current,
                            start: "top 85%",
                            toggleActions: once
                                ? "play none none none"
                                : "play none none reverse",
                        },
                    }
                );
            } else {
                const items = ref.current.querySelectorAll(selector);
                if (!items || items.length === 0) return;

                gsap.fromTo(
                    items,
                    { y, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration,
                        ease: "power2.out",
                        stagger,
                        scrollTrigger: {
                            trigger: ref.current,
                            start: "top 85%",
                            toggleActions: once
                                ? "play none none none"
                                : "play none none reverse",
                        },
                    }
                );
            }
        }, ref);

        return () => ctx.revert();
    }, [stagger, y, duration, selector, single, once]);

    return (
        <div ref={ref} className={`fade-stagger ${className}`}>
            {children}
        </div>
    );
};

export default FadeInStagger;
