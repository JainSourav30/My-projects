import { X } from "lucide-react";
export function ShowPayments({ transactions,setshowTransactions }) {
    const LatesttransactionsonTop = transactions.reverse();
    return (
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl h-[37vh] mx-auto bg-cyan-100 shadow-lg shadow-cyan-300 rounded-2xl py-6 px-2 space-y-1">
        <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold font-sans italic text-gray-700 mb-4 pl-4 mt-2 text-center">TRANSACTION HISTORY</h2>
        <button className="bg-slate-200 h-10 w-10 rounded-full mr-3 flex items-center justify-center" onClick={()=>{
            setTimeout(()=>{setshowTransactions(false)},200);
        }}><X size={25}/></button>
        </div>
        

        <div className="overflow-y-auto h-[24vh]">
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
                        <td className="border border-gray-300 font-semibold px-4 text-md py-2 text-gray-500 ">
                        {new Date(transaction.CreatedAt).toLocaleString()}
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