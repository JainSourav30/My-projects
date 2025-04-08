import { X } from "lucide-react";
import { Trash } from "lucide-react";
import { useState } from "react"; 
import { useTagSpending } from "../context/useTagSpending";
import axios from "axios";
 
export function ShowPayments({setshowTransactions }) {
    const {transactions,deleteTransaction} = useTagSpending();
    
    const HandleDelete = async (transactionid,TagName,amount) => {
        try{
        await axios.delete(`http://localhost:3000/api/v1/account/${transactionid}`,{
                data:{
                    TagName,
                    amount,
                },
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            deleteTransaction(TagName,parseFloat(amount),transactionid);
            alert(`Deleted payment of ₹${amount} from category ${TagName}`);
        }catch(error){
            console.error(error);
        }
    };
    const LatesttransactionsonTop = [...transactions].reverse();

        
    return (
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl h-[53vh] mx-auto bg-gradient-to-r from-slate-50 to-orange-300 shadow-lg shadow-cyan-300 rounded-2xl py-6 px-2 space-y-1">
        <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold font-sans italic text-orange-600 mb-4 pl-4 mt-2 text-center">TRANSACTION HISTORY</h2>
        <button className="bg-slate-200 h-10 w-10 rounded-full mr-3 flex hover:scale-125 items-center justify-center" onClick={()=>{
            setTimeout(()=>{setshowTransactions(false)},200);
        }}><X size={25}/></button>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-gray-600 to-gray-300 rounded-full mb-4"></div>

        <div className="overflow-y-auto  h-[calc(100%-80px)">
            {LatesttransactionsonTop.length === 0 ? (
            <p className="text-gray-500 text-xl font-semibold italic text-center">No transactions available</p>
            ) : (
            <div className="overflow-x-auto rounded-2xl">
                <table className="w-full border-collapse border border-gray-300">
                {/* Table Header */}
                <thead className="bg-gray-200 ">
                    <tr>
                    <th className="border border-gray-300 px-4 py-2 text-gray-700 text-lg italic text-bold text-center">Category</th>
                    <th className="border border-gray-300 px-2 py-2 text-gray-700 text-lg italic text-bold text-left">Amount (₹)</th>
                    <th className="border border-gray-300 px-2 py-2 text-gray-700 text-lg italic text-bold text-center">Date & Time</th>
                    </tr>
                </thead>
    
                {/* Table Body */}
                <tbody>
                    {LatesttransactionsonTop.map((transaction, index) => (
                    <tr key={index} className="border-b border-gray-300">
                        <td className="border border-gray-300 text-gray-700 italic text-lg font-semibold px-4 py-2">{transaction.Tag}</td>
                        <td className="border border-gray-300 px-4 py-2 text-lg font-semibold text-green-600">
                        ₹{transaction.Amount}
                        </td>
                        <td className="border border-gray-300 flex justify-between items-center sm:gap-11 font-semibold pl-4 pr-2 text-md py-2 text-gray-500 ">
                            <div className="">
                                {new Date(transaction.CreatedAt).toLocaleString()}
                            </div>
                            <div>
                                <button className="text-red-700 hover:scale-125" onClick={()=>{
                                    HandleDelete(transaction._id,transaction.Tag,transaction.Amount);
                                }}><Trash size={23}/></button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
      </div>
    );
}