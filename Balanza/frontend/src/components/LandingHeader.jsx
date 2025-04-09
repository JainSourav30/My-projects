import { useNavigate } from "react-router-dom";


export function LandingHeader(){
    const navigate = useNavigate();
    return(
        <div className="text-black h-max flex justify-between p-3">
            <div className="text-3xl w-full text-[#f5a623] italic font-mono font-bold pl-1 sm:pl-10 md:pl-15 lg:pl-60 py-5">
                BALANZA
            </div>
            <div className="pr-1 sm:pr-10 md:pr-15 lg:pr-60 py-5 flex  w-full gap-3 justify-end ">
                <div><button className="w-full text-white text-sm sm:text-lg font-bold bg-[#31314d] px-3 md:px-5 py-2 rounded-3xl hover:bg-gray-900 cursor-pointer" onClick={()=>{
                    setTimeout(()=>{navigate('/signin')},500)
                }}>Sign In
                </button>
                </div>
                <div><button className="w-full text-[#f5a623] text-sm sm:text-lg font-bold bg-[#31314d] px-3 md:px-5 py-2 rounded-full hover:bg-gray-900 cursor-pointer" onClick={()=>{
                    setTimeout(()=>{navigate('/signup')},500)
                }}>Sign Up
                </button>
                </div>
            </div>
        </div>
    )
}