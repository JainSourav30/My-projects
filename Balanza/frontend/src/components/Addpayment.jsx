import axios from "axios";
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
        //alert('inside handle payment function');
        const isValidNumber = (value) => /^\d+$/.test(value);
        if((!isValidNumber(amount)|| amount==="" || amount <= 0)||(selectedtag === null)){
            alert('enter valid Amount details & Select a Tag')
            setAmount("");
            return;
        }

        try{
            const response = await axios.post('http://localhost:3000/api/v1/payments/addpayment',{
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
): (
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl h-[37vh] mx-auto bg-cyan-100 shadow-lg shadow-cyan-300 rounded-2xl py-6 px-10 space-y-4">
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-sans italic text-gray-700 text-center ml-2 sm:text-start">
            MY SPENDING
          </h2>
          <div>
            <input
              type="string"
              className="w-full p-1 xl:p-2 placeholder:text-gray-500 placeholder:italic placeholder:font-semibold border-2 border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    className={`bg-blue-100 cursor-pointer font-semibold text-blue-700 text-sm px-3 py-1 rounded-full transition-all ${
                      isSelected ? "bg-orange-300 text-blue-700" : "bg-blue-100 text-blue-700 hover:bg-blue-300"
                    }`}
                    onClick={() => toggletag(tag)}
                  >
                    {tag}
                  </button>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm">No tags available</p>
            )}
          </div>
          <div className="flex justify-between gap-2 ">
            <button
              className="bg-green-500 text-white font-sm text-lg md:text-xs xl:text-lg  sm:font-md font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition"
              onClick={handlePayment}
            >
              Add Payment
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 text-lg md:text-xs xl:text-lg font-semibold rounded-lg hover:bg-gray-800 transition"
              onClick={viewPayment}
            >
              View Payments
            </button>
          </div>
        </div>
      </div>
    )}    
        </div>
    )
}