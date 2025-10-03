import { ChevronDown } from 'lucide-react'
import React from 'react'

export default function AnimatedChevrons() {
  return (
    <div className="flex flex-col items-center">
      <ChevronDown
        className="w-16 h-16 text-slate-400 animate-bounce hover:text-white transition-colors duration-300"
        style={{
          animationDelay: "0s",
          animationDuration: "2s",
        }}
      />
      <ChevronDown
        className="w-16 h-16 text-slate-400 animate-bounce hover:text-white transition-colors duration-300"
        style={{
          animationDelay: "0.3s",
          animationDuration: "2s",
        }}
      />
    </div>
  )
}
