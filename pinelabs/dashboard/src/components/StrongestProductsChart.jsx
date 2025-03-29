import React from "react";

// Example data
const strongestProducts = [
  { name: "Clothing", percentage: 95 },
  { name: "Electronic Products", percentage: 92 },
  { name: "Cosmetics", percentage: 89 },
];

const StrongestProductsChart = () => {
  return (
    <div className="p-4">
      <h2 className="text-gray-500 mb-4">Strongest Products</h2>

      <div className="space-y-4">
        {strongestProducts.map((item) => (
          <div key={item.name}>
            {/* Label & Percentage Row */}
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-600 font-medium">{item.name}</p>
              <p className="text-gray-500">{item.percentage}% Correct</p>
            </div>

            {/* Progress Bar Container */}
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              {/* Filled Part (Gradient from Blue to Green to Light Green) */}
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 via-green-400 to-green-100"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrongestProductsChart;