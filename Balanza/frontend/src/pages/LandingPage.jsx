import { LandingHeader } from "../components/LandingHeader";
import {MyAnimation} from '../components/LandingAnimate'
import { useState } from "react";

export function LandingPage(){
    
    return(
        <div className="bg-gradient-to-r from-purple-800 to-gray-600 text-white min-h-screen flex flex-col  ">
            <LandingHeader/>
            <div className="max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center gap-10 pt-10 lg:pt-12 px-10 w-full">
                <h2 className="text-2xl lg:text-7xl font-bold text-center"><span className="font-bold text-[#ffb385]">Smarter Spending</span> Starts Here</h2>
                <p className="text-lg lg:text-xl font-semibold text-center max-w-xl">An <span className="font-bold text-[#a18aff] text-xl">Intelligent</span> platform that helps you take control of your finances. <span className="font-bold text-[#ff6f61] text-2xl">Visualize expenses</span> , set goals and get personalized insights — all backed by <span className="font-bold text-xl text-[#ffb385]">Smart AI</span>.</p>
                <div className="h-[35vh] w-[35vh]">
                    <MyAnimation/>
                </div>
            </div>
        </div>
    )
}