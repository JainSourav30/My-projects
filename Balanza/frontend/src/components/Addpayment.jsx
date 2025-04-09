
import api from "../api/axios";
import { useState } from "react";
import { useTagSpending } from "../context/useTagSpending";
import {ShowPayments} from "./ShowPayments";

export function Addpayment(){
    const tags = ['Food','Travel','Groceries','Shopping','Subscriptions','Utilities','Others']
    const[amount,setAmount]=useState("");
    const[selectedtag,setSelectedtag]=useState(null);
    const {addTransaction} = useTagSpending(); 
    const [showTransactions,setShowTransactions]=useState(false);

    const toggletag = (tag)=>{
        setSelectedtag(selectedtag===tag ? null : tag);
    }

    const handlePayment = async()=>{
        const isValidNumber = (value) => /^\d+$/.test(value);
        if((!isValidNumber(amount)|| amount==="" || amount <= 0)||(selectedtag === null)){
            alert('enter valid Amount details & Select a Tag')
            setAmount("");
            return;
        }

        try{
            const response = await api.post('/api/v1/payments/addpayment',{
                amount:amount,
                tag:selectedtag
            },{
                headers:{Authorization :`Bearer ${localStorage.getItem('token')}`}
            })
            const newtransaction = response.data;
            addTransaction(newtransaction);
            alert(`Spending of ₹${amount} added Successfully in ${selectedtag}`)
            setAmount("");
            setSelectedtag(null)
        }catch(error){
            console.error("facing issue in adding Payment!")
        }
    }

    const viewPayment = async()=>{
      setTimeout(()=>{setShowTransactions(true)},200)
    }
    return (
      <div>
      {showTransactions ? (
        <div className="">
          <ShowPayments setshowTransactions={setShowTransactions}/>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-100 rounded-lg shadow-md border-none flex flex-col">
          <div className="p-5 space-y-9 flex-grow">
            <h2 className="text-2xl font-bold font-sans italic text-orange-600">ADD NEW EXPENSE</h2>
            <div className="h-0.5 bg-gradient-to-r from-gray-600 to-gray-300 rounded-full "></div>
            
            <div className="flex flex-col md:flex-row gap-5 flex-grow">
              {/* Left side - Input and Add Payment button */}
              <div className="md:w-1/2 space-y-7">
                <input
                  type="string"
                  className="w-full p-4 text-lg bg-white text-slate-800 placeholder:text-slate-400 placeholder:italic placeholder:font-semibold border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:text-xl transition-all duration-200"
                  placeholder="Enter Amount in ₹"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  className="w-full bg-blue-500 text-white font-semibold text-lg px-4 py-3 rounded-md hover:bg-blue-600 transition"
                  onClick={handlePayment}
                >
                  Add Payment
                </button>
                
                <button
                  className="w-full bg-slate-700 text-white px-5 py-3 text-lg font-semibold rounded-md hover:bg-slate-800 transition"
                  onClick={viewPayment}
                >
                  View Payments
                </button>
              </div>
              
              {/* Right side - Tags */}
              <div className="md:w-1/2">
                <div className="flex flex-wrap gap-3">
                  {tags.length > 0 ? (
                    tags.map((tag, index) => {
                      const isSelected = selectedtag === tag;
                      return (
                        <button
                          key={index}
                          className={`cursor-pointer font-semibold text-base px-4 py-2 rounded-full transition-all ${
                            isSelected ? "bg-blue-500 text-white" : "bg-white text-slate-700 hover:bg-slate-300 border border-slate-300"
                          }`}
                          onClick={() => toggletag(tag)}
                        >
                          {tag}
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-slate-500 text-base">No tags available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}    
      </div>
    )
}