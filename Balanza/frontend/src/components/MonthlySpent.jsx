import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cell,BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { useTagSpending } from "../context/useTagSpending";
export function MonthBarGraph () {
    const {totalSpent}= useTagSpending();
    const randomtags =[{'Tag':"food",'TotalSpent':'0'},{'Tag':'Travel','TotalSpent':'0'},{'Tag':'Groceries','TotalSpent':'0'},{"Tag":'Shopping','TotalSpent':'0'}];
    const {tags} = useTagSpending();
    const filteredTags = tags.filter(item => item.TotalSpent > 0);
    let sortedTags =[{}];
    if(filteredTags.length > 0){
      sortedTags = filteredTags.sort((a,b)=>b.TotalSpent - a.TotalSpent);
    }
    else{
      sortedTags = randomtags;
    }
    const COLORS = [
        "#0088FE", "#00C49F", "#FFBB28", "#FF8042", 
        "#A933FF", "#FF3366", "#33FF99", "#FF6633", 
        "#3399FF", "#FF33A1"
      ];

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 h-[50vh] shadow-lg shadow-cyan-300 rounded-2xl pt-6 px-0 md:px-6 ">
      <div className="w-full text-center">
        <h2 className="text-sm sm:text-lg font-bold italic text-gray-700 ml-17 mb-3">Total Spent this Month: <span className="text-red-500">₹{totalSpent}</span></h2>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={sortedTags} margin={{ top: 5, right: 10, left: 10, bottom:5 }}>
          
          {/* X-Axis (Tags) */}
          <XAxis dataKey="Tag" tick={{ fill: "gray", fontSize: 15, fontWeight: "bold" }} />
          
          {/* Y-Axis (Total Spent) */}
          <YAxis 
          tickFormatter={(value) => `₹${value}`}
          tick={{ fill: "gray", fontSize: 15, fontWeight: "bold" }}
          domain={[0, 'auto']} />
          
          {/* Tooltip */}
          <Tooltip formatter={(value) => `₹${value}`} />
          
          
          {/* Bars */}
          <Bar dataKey="TotalSpent" fill="#8884d8">
            {sortedTags.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}