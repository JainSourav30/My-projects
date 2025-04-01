import { useEffect, useState } from "react";
import { DashBar } from "../components/DashBar";
import { Users } from "../components/Users";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { ShowTransactions } from "../components/Transactions";
import { Addpayment } from "../components/Addpayment";
import { Goals } from "../components/Goals";


export function Dashboard({setIsAuthenticated}){
    const[paymenttag,setPaymentTag]=useState(null);
    const firstname = localStorage.getItem('firstname');
    
    //const [balance,setBalance] = useState(null);
    //const lastname = localStorage.getItem('lastname');
    //const navigate = useNavigate();


    //Getting account balance from here
    // //useEffect(()=>{
    //     const token = localStorage.getItem('token');
    //     if(!token){
    //         navigate('/');
    //         return;
    //     }
    //     axios.get("http://localhost:3000/api/v1/account/balance",
    //         {
    //             headers:{Authorization: `Bearer ${token}`}
    //         }
    //     ).then((response)=>{
    //         setBalance(response.data.balance)
    //     })
    // },[navigate])
    
    return (
    <div className="relative">
        <div className="bg-orange-100 h-screen">
            <DashBar setIsAuthenticated={setIsAuthenticated} user={firstname}/>
            <div className=" grid grid-cols-1 md:grid-cols-3 space-y-4 md:space-y-0 py-2 bg-red-200">
                <div className=""><Addpayment setPaymentTag={setPaymentTag}/></div>
                <div className="">
                    <Goals paymenttag={paymenttag} />
                </div>
                <div className="bg-red-300">
                    Insights
                </div>
            </div>
        </div>
    </div>
    )
}