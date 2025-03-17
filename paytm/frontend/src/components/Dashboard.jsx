import { useEffect, useState } from "react";
import { DashBar } from "./DashBar";
import { Users } from "./Users";
import axios from 'axios';
import { useLocation } from "react-router-dom";

export function Dashboard(){
    const [balance,setBalance] = useState(null);
    const location = useLocation();
    const User = location.state?.user;


    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            console.error("no token found");
            return;
        }
        axios.get("http://localhost:3000/api/v1/account/balance",
            {
                headers:{Authorization: `Bearer ${token}`}
            }
        ).then((response)=>{
            setBalance(response.data.balance)
        })
    },[])
    
    
        
    return (
        <div className="bg-white h-screen ">
            <DashBar user={User.firstname}/>
            <div className="bg-white text-xl font-bold pt-4 pb-6 pl-7">
                Your Balance <span className="pl-3">{balance}</span>
            </div>
            {/* <div className="bg-white text-xl font-bold pt-1 pb-6 pl-7 pr-7">
                Users
                <div className="pt-4 text-lg font-medium">
                    <input placeholder="Search Users.." className="px-4 py-2 rounded-lg border border-slate-400 w-full "></input>
                </div>
            </div> */}
            <Users Self={User}/>
        </div>
    )
}