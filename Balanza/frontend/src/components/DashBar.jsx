import { useState } from "react";
import { ProfileButton } from "./ProfileButton";

export function DashBar({setIsAuthenticated,user}){
    const initial = user ? user.charAt(0).toUpperCase():"?" ;
    const [showprofile,setShowprofile]= useState(false);
    return(
        <div className="bg-gradient-to-r from-gray-800 to-gray-600 py-3 md:py-4 px-2 flex justify-between border border-b-slate-200">
            <div className="pl-2 md:pl-10 text-2xl md:text-4xl text-[#f5a623] italic font-mono font-bold">
                BALANZA
            </div>
            <div className="pr-2 md:pr-4 text-sm md:text-xl font-medium flex items-center">
                <div className="text-white text-mono italic pr-2 md:pr-4">
                    Hello, {user}
                </div>
                <div className="relative inline-block">
                    <button className="bg-slate-200 border border-[#31314d] cursor-pointer rounded-full px-3 md:px-4 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center ring-2 italic" onClick={()=>{
                        setShowprofile(!showprofile);
                    }}>
                        {initial}
                    </button>
                    {showprofile && (
                        <div className="absolute right-0 top-8 md:top-10 mt-2 w-35 bg-gray-200 border-2 border-slate-300 rounded-md shadow-xl">
                            <ProfileButton setIsAuthenticated={setIsAuthenticated}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}