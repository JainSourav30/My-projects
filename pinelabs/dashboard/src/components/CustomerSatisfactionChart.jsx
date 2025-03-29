import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Week 1", lastMonth: 1200, thisMonth: 1800 },
  { name: "Week 2", lastMonth: 1800, thisMonth: 2100 },
  { name: "Week 3", lastMonth: 1500, thisMonth: 2400 },
  { name: "Week 4", lastMonth: 2000, thisMonth: 2800 },
  // Add more data points as needed
];

const CustomerSatisfactionChart = () => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          {/* Light dotted grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          
          {/* Axes */}
          <XAxis dataKey="name" />
          <YAxis />
          
          {/* Tooltip on hover */}
          <Tooltip />

          {/* Optional legend (shows color + label) */}
          <Legend verticalAlign="top" align="left" iconType="circle" />

          {/* Define two gradients (one for each line) */}
          <defs>
            {/* Blue Gradient (Last Month) */}
            <linearGradient id="colorLastMonth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            
            {/* Green Gradient (This Month) */}
            <linearGradient id="colorThisMonth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          {/* "Last Month" Line + Gradient */}
          <Area
            type="monotone"
            dataKey="lastMonth"
            stroke="#3B82F6"
            strokeWidth={3}
            fill="url(#colorLastMonth)"
          />
          
          {/* "This Month" Line + Gradient */}
          <Area
            type="monotone"
            dataKey="thisMonth"
            stroke="#10B981"
            strokeWidth={3}
            fill="url(#colorThisMonth)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerSatisfactionChart;