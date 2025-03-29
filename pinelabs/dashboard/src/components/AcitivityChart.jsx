import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data (Months vs. Some Value)
const data = [
  { name: "March", value: 100 },
  { name: "April", value: 250 },
  { name: "May", value: 210 },
  { name: "June", value: 150 },
  { name: "Jul", value: 200 },
  { name: "Aug", value: 400 },
  { name: "Sep", value: 300 },
  { name: "Oct", value: 600 },
  { name: "Nov", value: 500 },
  { name: "Dec", value: 700 },
  { name: "Jan", value: 650 },
];

const ActivityChart = () => {
  return (
    <div className="w-full h-full">
      {/* ResponsiveContainer automatically adjusts to the parent's size */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          {/* Grid Lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

          {/* X and Y Axes */}
          <XAxis dataKey="name" />
          <YAxis />

          {/* Tooltip on Hover */}
          <Tooltip />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Area with Stroke + Gradient Fill */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#34d399"
            strokeWidth={3}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;