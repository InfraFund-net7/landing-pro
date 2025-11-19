'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface EnergyData {
  month: string;
  energy: number;
}

const rawEnergyData: EnergyData[] = [
  { month: 'Jan', energy: 120 },
  { month: 'Feb', energy: 150 },
  { month: 'Mar', energy: 300 },
  { month: 'Apr', energy: 120 },
  { month: 'May', energy: 230 },
  { month: 'Jun', energy: 220 },
  { month: 'Jul', energy: 140 },
  { month: 'Aug', energy: 110 },
  { month: 'Sep', energy: 110 },
  { month: 'Oct', energy: 140 },
  { month: 'Nov', energy: 230 },
  { month: 'Dec', energy: 180 },
  { month: 'Jan', energy: 210 },
  { month: 'Feb', energy: 200 },
  { month: 'Mar', energy: 160 },
  { month: 'Apr', energy: 320 },
  { month: 'May', energy: 150 },
];

const maxEnergy = Math.max(...rawEnergyData.map((d) => d.energy));
const energyData = rawEnergyData.map((d) => ({
  ...d,
  energy: Number((d.energy / maxEnergy).toFixed(2)),
}));

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    payload: EnergyData;
    value: number;
  }[];
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const { month, energy } = payload[0].payload;
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-white text-sm">
          Month: <span className="font-semibold">{month}</span>
        </p>
        <p className="text-green-400 text-sm">
          Performance: <span className="font-semibold">{energy}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function BuilderEnergyFlow() {
  return (
    <div
      className="w-[534px] h-fit flex items-center justify-center rounded-lg 
                        max-lg:w-[90%] max-md:w-full max-md:px-2 max-md:py-4"
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-white text-2xl font-semibold text-center max-md:text-lg">
          Performance Indicator
        </h1>
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

              <CartesianGrid
                strokeDasharray="0"
                stroke="#2a2e3d"
                vertical
                horizontal
              />

              <XAxis
                dataKey="month"
                stroke="#6b7280"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#6b7280"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 1]}
                ticks={[0, 0.25, 0.5, 0.75, 1]}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#4a6fa5', strokeWidth: 1 }}
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
  );
}
