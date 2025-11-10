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

interface TokenValueData {
  month: string;
  value: number;
}

const tokenValueData: TokenValueData[] = [
  { month: 'Jan', value: 0.4 },
  { month: 'Feb', value: 0.7 },
  { month: 'Mar', value: 1.3 },
  { month: 'Apr', value: 0.9 },
  { month: 'May', value: 1.6 },
  { month: 'Jun', value: 1.2 },
  { month: 'Jul', value: 1.9 },
  { month: 'Aug', value: 1.1 },
  { month: 'Sep', value: 0.8 },
  { month: 'Oct', value: 1.5 },
  { month: 'Nov', value: 1.7 },
  { month: 'Dec', value: 1.3 },
  { month: 'Jan', value: 1.9 },
  { month: 'Feb', value: 1.4 },
  { month: 'Mar', value: 0.6 },
  { month: 'Apr', value: 1.8 },
  { month: 'May', value: 1.0 },
];

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    payload: TokenValueData;
    value: number;
  }[];
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const { month, value } = payload[0].payload;
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-white text-sm">
          Month: <span className="font-semibold">{month}</span>
        </p>
        <p className="text-green-400 text-sm">
          Value: <span className="font-semibold">£{value.toFixed(2)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function BuilderTokenFlow() {
  return (
    <div
      className="w-[534px] h-fit flex items-center justify-center rounded-lg 
                        max-lg:w-[90%] max-md:w-full max-md:px-2 max-md:py-4"
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-white text-2xl font-semibold text-center max-md:text-lg">
          Token Value
        </h1>
        <div className="w-full h-[208px] max-md:h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={tokenValueData}
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
                domain={[0, 2]}
                ticks={[0, 0.5, 1, 1.5, 2]}
                tickFormatter={(val) => `£${val}`}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#4a6fa5', strokeWidth: 1 }}
              />

              <Area
                type="monotone"
                dataKey="value"
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
