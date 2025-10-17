"use client"

import { FileCheck, Layers, DollarSign } from "lucide-react"
import { useEffect, useRef } from "react"

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
        <div className="relative w-full max-w-7xl">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-center py-12 md:py-20 max-md:gap-10 max-md:px-4">
                {/* NODE 1 */}
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full border-2 border-green-400/30 w-48 h-48 md:w-64 md:h-64" />
                        <div className="absolute inset-4 rounded-full border border-green-400/20 w-40 h-40 md:w-56 md:h-56" />
                        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-green-400 bg-background flex items-center justify-center animate-pulse-glow">
                                <FileCheck className="w-16 h-16 md:w-20 md:h-20 text-green-400" strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-lg md:text-xl font-semibold text-green-400">Document Verification</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Secure validation and authentication of digital documents
                        </p>
                    </div>
                </div>

                {/* NODE 2 */}
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full border-2 border-green-400/30 w-48 h-48 md:w-64 md:h-64" />
                        <div className="absolute inset-4 rounded-full border border-green-400/20 w-40 h-40 md:w-56 md:h-56" />
                        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-green-400 bg-background flex items-center justify-center animate-pulse-glow">
                                <Layers className="w-16 h-16 md:w-20 md:h-20 text-green-400" strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-lg md:text-xl font-semibold text-green-400">Blockchain Processing</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Distributed ledger technology for secure transactions
                        </p>
                    </div>
                </div>

                {/* NODE 3 */}
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full border-2 border-green-400/30 w-48 h-48 md:w-64 md:h-64" />
                        <div className="absolute inset-4 rounded-full border border-green-400/20 w-40 h-40 md:w-56 md:h-56" />
                        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-green-400 bg-background flex items-center justify-center animate-pulse-glow">
                                <div className="relative">
                                    <DollarSign className="w-16 h-16 md:w-20 md:h-20 text-green-400" strokeWidth={1.5} />
                                    <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-green-400" />
                                    <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-green-400" />
                                    <div className="absolute top-1/2 -left-4 w-2 h-2 rounded-full bg-green-400" />
                                    <div className="absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-green-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-lg md:text-xl font-semibold text-green-400">Digital Assets</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">Cryptocurrency and tokenized value exchange</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
