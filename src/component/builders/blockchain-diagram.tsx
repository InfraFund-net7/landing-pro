"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { buildersdata } from "@/data/builders"

export default function BlockchainDiagram() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const updateCanvasSize = () => {
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width * window.devicePixelRatio
            canvas.height = rect.height * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }

        updateCanvasSize()
        window.addEventListener("resize", updateCanvasSize)

        const drawMesh = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.strokeStyle = "rgba(34, 211, 238, 0.1)"
            ctx.lineWidth = 0.5

            const spacing = 50
            const rows = Math.ceil(canvas.height / spacing)
            const cols = Math.ceil(canvas.width / spacing)

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const x = j * spacing
                    const y = i * spacing
                    if (Math.random() > 0.7 && j < cols - 1) {
                        ctx.beginPath()
                        ctx.moveTo(x, y)
                        ctx.lineTo(x + spacing, y)
                        ctx.stroke()
                    }
                    if (Math.random() > 0.7 && i < rows - 1) {
                        ctx.beginPath()
                        ctx.moveTo(x, y)
                        ctx.lineTo(x, y + spacing)
                        ctx.stroke()
                    }
                }
            }
        }

        drawMesh()
        return () => window.removeEventListener("resize", updateCanvasSize)
    }, [])

    return (
        <div className="relative w-full flex flex-col gap-8 h-fit">
            <div className="relative w-full hidden lg:flex justify-between items-start px-10">
                {buildersdata.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center gap-6 w-[300px]"
                    >
                        <div className="relative w-[300px] h-[300px] rounded-full flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgba(36,255,142,0.02)] via-[rgba(36,255,142,0.4)] to-[rgba(36,255,142,0.02)] p-[2px]">
                                <div className="w-full h-full rounded-full flex justify-center items-center bg-[#0a0e1a]">
                                    <Image
                                        src={item.image}
                                        width={200}
                                        height={200}
                                        alt={item.title}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                        <h3 className="text-lg md:text-[30px] font-medium">{item.title}</h3>
                        <p className="text-sm md:text-[20px] font-normal max-w-xs text-slate-300">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="relative w-full flex flex-col items-center gap-12 px-4 lg:hidden">
                {buildersdata.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center gap-4"
                    >
                        <div className="relative w-[180px] h-[180px] rounded-full flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgba(36,255,142,0.05)] via-[rgba(36,255,142,0.4)] to-[rgba(36,255,142,0.05)] p-[2px]">
                                <div className="w-full h-full rounded-full flex justify-center items-center bg-[#0a0e1a]">
                                    <Image
                                        src={item.image}
                                        width={120}
                                        height={120}
                                        alt={item.title}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-slate-300 max-w-[250px]">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
