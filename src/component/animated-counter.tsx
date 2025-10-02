"use client"

import { useEffect, useState, useRef } from "react"

interface CounterData {
  value: number
  label: string
  suffix?: string
  prefix?: string
}

const counters: CounterData[] = [
  { value: 15, label: "Supported Chains" },
  { value: 50, label: "Integrated Projects" },
  { value: 874, label: "TVL", prefix: "$", suffix: "M" },
  { value: 90, label: "Yieldcoin Market Share", suffix: "%" },
]

function useAnimatedCounter(targetValue: number, shouldAnimate: boolean, duration = 2000) {
  const [currentValue, setCurrentValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated || !shouldAnimate) return

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(startValue + (targetValue - startValue) * easeOutQuart)

      setCurrentValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCurrentValue(targetValue)
        setHasAnimated(true)
      }
    }

    // Start animation after a small delay
    const timer = setTimeout(() => {
      animate()
    }, 300)

    return () => clearTimeout(timer)
  }, [targetValue, duration, hasAnimated, shouldAnimate])

  return currentValue
}

function CounterItem({ data, index, shouldAnimate }: { data: CounterData; index: number; shouldAnimate: boolean }) {
  const animatedValue = useAnimatedCounter(data.value, shouldAnimate, 2000 + index * 200)

  return (
    <div className="text-left w-full h-fit gap20">
      <div className="text-4xl md:text-[72px] font-medium text-white mb-2">
        {data.prefix || ""}
        {animatedValue.toLocaleString()}
        {data.suffix || ""}
      </div>
      <div className="text-gray-400 text-sm md:text-2xl">{data.label}</div>
    </div>
  )
}

export function AnimatedCounter() {
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [isVisible])

  return (
    <div ref={counterRef} className="w-full h-[390px] flex justify-center items-center px-[90px]">
        {counters.map((counter, index) => (
          <CounterItem key={index} data={counter} index={index} shouldAnimate={isVisible} />
        ))}
    </div>
  )
}
