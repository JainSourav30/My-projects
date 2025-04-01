import { useState } from "react";
import { ProfileButton } from "./ProfileButton";

export function DashBar({setIsAuthenticated,user}){
    const initial = user ? user.charAt(0).toUpperCase():"?" ;
    const [showprofile,setShowprofile]= useState(false);
    return(
        <div className="bg-[#31314d] py-4 px-2 flex justify-between border border-b-slate-200">
            <div className="pl-10 text-4xl text-[#f5a623] italic font-mono font-bold">
                BALANZA
            </div>
            <div className="pr-4 text-xl font-medium flex justify between">
                <div className=" text-white text-mono italic pr-4 pt-1">
                    Hello, {user}
                </div>
                <div className=" relative inline-block ">
                    <button className="bg-slate-200 border border-[#31314d] cursor-pointer rounded-full px-4 w-9 h-9 flex items-center justify-center ring-2 italic ring-orange-600" onClick={()=>{
                        setShowprofile(!showprofile);
                    }}>
                        {initial}
                    </button>
                    {showprofile && (
                        <div className="absolute right-0 top-10 mt-2 w-48 bg-white border-2 border-slate-300 rounded-md shadow-xl">
                            <ProfileButton setIsAuthenticated={setIsAuthenticated}/>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}