import axios from "axios";
import { useState } from "react";

export function Addpayment({setPaymentTag}){
    const tags = ['Food','Travel','Groceries','Shopping','Subscriptions','Utilities','Others']
    const[amount,setAmount]=useState("");
    const[selectedtag,setSelectedtag]=useState(null);
    const toggletag = (tag)=>{
        setSelectedtag(selectedtag===tag ? null : tag);
    }

    const handlePayment = async()=>{
        //alert('inside handle payment function');
        const isValidNumber = (value) => /^\d+$/.test(value);
        if((!isValidNumber(amount)|| amount==="")||(selectedtag === null)){
            alert('enter valid Amount details & Select a Tag')
            setAmount("");
        }

        try{
            await axios.post('http://localhost:3000/api/v1/payments/addpayment',{
                amount:amount,
                tag:selectedtag
            },{
                headers:{Authorization :`Bearer ${localStorage.getItem('token')}`}
            })
            alert(`Spending of ₹${amount} added Successfully in ${selectedtag}`)
            setPaymentTag(selectedtag);
            setAmount("");
            setSelectedtag(null)
        }catch(error){
            console.error("facing issue in adding Payment!")
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-2xl rounded-2xl py-6 px-10 space-y-4">
          {/* Title */}
          <h2 className="text-lg font-bold font-sans italic text-gray-700">MY SPENDING</h2>
          {/* Amount Input */}
          <div className="flex flex-row">
            <input
                type="string"
                className="w-full p-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Amount in ₹"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />
          </div>
    
            {/* Tags Display */}
          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
                tags.map((tag, index) => {
                const isSelected = selectedtag === tag;
               return (
                    <button
                      key={index}
                      className={`bg-blue-100 cursor-pointer font-semibold text-blue-700 text-sm px-3 py-1 rounded-full  ${
                    isSelected
                  ? "bg-orange-300 text-blue-700"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-300"
              }`} onClick={()=>toggletag(tag)}>
                      {tag} 
                    </button>
                )})
            ) : (
              <p className="text-gray-500 text-sm">No tags available</p>
            )}
          </div>

            {/* Buttons */}
          <div className="flex gap-24 md:gap-2 lg:gap-24">
            <button
              className="bg-green-500 text-white font-sm sm:font-md font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition"
              onClick={handlePayment}
            >
              Add Payment
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 font-semibold rounded-lg hover:bg-gray-800 transition"
              onClick={()=>alert("taking to payment history list")}
            >
              View Payments
            </button>
          </div>
        </div>
      );
}