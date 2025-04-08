
import { useState } from "react";
import { DashBar } from "../components/DashBar";
import { Addpayment } from "../components/Addpayment";
import { Goals } from "../components/Goals";
import { MonthlyHistory } from "../components/BarGraph";
import { MonthBarGraph } from "../components/MonthlySpent";
import InsightsDisplay from "../components/Insights";

export function Dashboard({setIsAuthenticated}){
    const firstname = localStorage.getItem('firstname');
    const [activeChart, setActiveChart] = useState('thisMonth'); // 'thisMonth' or 'allMonths'
    
    return (
        // In your Dashboard component, update the main container div:
        <div className="bg-white  min-h-screen">
            <DashBar setIsAuthenticated={setIsAuthenticated} user={firstname}/>
            
            <div className="container mx-auto px-4 py-6">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-600 rounded-xl shadow-lg p-6 mb-6 text-white">
                    <h1 className="text-2xl font-bold">Welcome back, {firstname || 'User'}!</h1>
                    <p className="opacity-80">Track your expenses, set goals, and get AI-powered insights</p>
                </div>
                
                {/* 2x2 Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 1: Add Payment */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="">
                            <Addpayment/>
                        </div>
                    </div>
                    
                    {/* Card 2: Goals */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">

                        <div className="">
                            <Goals />
                        </div>
                    </div>
                    
                    {/* Card 3: AI Insights */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="">
                            <InsightsDisplay/>
                        </div>
                    </div>
                    
                    {/* Card 4: Charts with Toggle */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-4 py-2 text-white font-bold flex justify-between items-center">
                            <span>Spending Analytics</span>
                            <div className="flex space-x-2">
                                <button 
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                        activeChart === 'thisMonth' 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-200 text-blue-800 hover:bg-gray-400'
                                    }`}
                                    onClick={() => setActiveChart('thisMonth')}
                                >
                                    This Month
                                </button>
                                <button 
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                        activeChart === 'allMonths' 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-200 text-blue-800 hover:bg-gray-400'
                                    }`}
                                    onClick={() => setActiveChart('allMonths')}
                                >
                                    All Months
                                </button>
                            </div>
                        </div>
                        <div className="">
                            {activeChart === 'thisMonth' ? (
                                <MonthBarGraph />
                            ) : (
                                <MonthlyHistory />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}