"use client"

import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

interface EnergyData {
    hour: number
    energy: number
}

const energyData: EnergyData[] = [
    { hour: 0, energy: 120 },
    { hour: 1, energy: 150 },
    { hour: 2, energy: 300 },
    { hour: 3, energy: 120 },
    { hour: 4, energy: 230 },
    { hour: 5, energy: 220 },
    { hour: 6, energy: 140 },
    { hour: 7, energy: 110 },
    { hour: 8, energy: 110 },
    { hour: 9, energy: 140 },
    { hour: 10, energy: 230 },
    { hour: 11, energy: 180 },
    { hour: 12, energy: 210 },
    { hour: 13, energy: 200 },
    { hour: 14, energy: 160 },
    { hour: 15, energy: 320 },
    { hour: 16, energy: 150 },
]

type CustomTooltipProps = {
    active?: boolean
    payload?: {
        payload: EnergyData
        value: number
    }[]
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const { hour, energy } = payload[0].payload
        return (
            <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 shadow-lg">
                <p className="text-white text-sm">
                    Hour: <span className="font-semibold">{hour}</span>
                </p>
                <p className="text-green-400 text-sm">
                    Energy: <span className="font-semibold">{energy}</span>
                </p>
            </div>
        )
    }
    return null
}

export default function BuilderEnergyFlow() {
    return (
        <div className="w-[534px] h-fit bg-[#1a1d29] flex items-center justify-center border border-gray-800 rounded-lg 
                        max-lg:w-[90%] max-md:w-full max-md:px-2 max-md:py-4">
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <h1 className="text-white text-2xl font-semibold text-center max-md:text-lg">Energy Flow</h1>
                <div className="w-full h-[208px] max-md:h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={energyData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4a6fa5" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#2d4a73" stopOpacity={0.3} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="0" stroke="#2a2e3d" vertical horizontal />
                            <XAxis
                                dataKey="hour"
                                stroke="#6b7280"
                                tick={{ fill: "#9ca3af", fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#6b7280"
                                tick={{ fill: "#9ca3af", fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                ticks={[0, 75, 150, 225, 300]}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ stroke: "#4a6fa5", strokeWidth: 1 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="energy"
                                stroke="#4a6fa5"
                                strokeWidth={2}
                                fill="url(#energyGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
