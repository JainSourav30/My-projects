import { useEffect, useState } from "react";
import { DashBar } from "../components/DashBar";
import { Users } from "../components/Users";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";


export function Dashboard({setIsAuthenticated}){
    const [balance,setBalance] = useState(null);
    const firstname = localStorage.getItem('firstname');
    const lastname = localStorage.getItem('lastname');
    const navigate = useNavigate();


    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/');
            return;
        }
        axios.get("http://localhost:3000/api/v1/account/balance",
            {
                headers:{Authorization: `Bearer ${token}`}
            }
        ).then((response)=>{
            setBalance(response.data.balance)
        })
    },[navigate])
        
    return (
        <div className="relative">
        <div className="bg-[#31314d] h-screen">
            <DashBar setIsAuthenticated={setIsAuthenticated} user={firstname}/>
            <div className="bg-white text-xl font-bold pt-4 pb-6 pl-7">
                Your Balance <span className="pl-3">{balance}</span>
            </div>
            {/* <div className="bg-white text-xl font-bold pt-1 pb-6 pl-7 pr-7">
                Users
                <div className="pt-4 text-lg font-medium">
                <input placeholder="Search Users.." className="px-4 py-2 rounded-lg border border-slate-400 w-full "></input>
                </div>
                </div> */}
            <Users FirstName={firstname} LastName={lastname}/>
        </div>
    </div>
    )
}