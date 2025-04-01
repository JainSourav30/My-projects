import axios from "axios";
import { useEffect, useState } from "react";

export function Goals({paymenttag}){
    const[tags,setTags]=useState([]);
    
    const token = localStorage.getItem('token');
    
    try{
        useEffect(()=>{
            try{
                axios.get('http://localhost:3000/api/v1/payments/alltags',{
                headers:{Authorization :`Bearer ${token}`}
                }).then((response)=>{
                setTags(response.data.Alltags)
                console.log("recieved all tags");
                })
            }catch(e){
                console.log(e.message);
            }if(paymenttag){
                axios.get('http://localhost:3000/api/v1/payments/tagdata?tag='+paymenttag)
            }
        },[token,paymenttag])
    }catch(error){
        console.log(error.message)
    }
    const sortedTags = tags.sort((a, b) => b.TotalSpent - a.TotalSpent);
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-bold font-sans italic text-gray-700 mb-4">SPENDING GOALS</h2>
          <div className="max-h-44 overflow-y-auto px-2">
            {sortedTags.length > 0 ? (
                sortedTags.map(({ Tag, Goal, TotalSpent }, index) => {
                    if(TotalSpent === 0){
                        return;
                    }
                const percentage = Math.min((TotalSpent / Goal) * 100, 100); // Ensures it doesn't exceed 100%
                return (
                    <div key={index} className="mb-2">
                    <div className="flex justify-between mb-1">
                        <span className="text-gray-700 italic font-sans font-bold">{Tag}</span>
                        <span className="text-gray-500 font-semibold">
                        <span className={`text-md font-bold ${TotalSpent < 2000 ? 'text-blue-700' : 'text-red-600' }`}>₹{TotalSpent}</span> / <span className="text-red-600 text-md font-bold">₹{Goal}</span>
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-6 relative">
                        <div
                        className="h-6 bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                        ></div>
                        {/* Amount inside the bar */}
                    </div>
                    </div>
                );
                })
            ) : (
                <p className="text-gray-500 text-sm">No Goals set yet</p>
            )}
          </div>
        </div>
      );
}