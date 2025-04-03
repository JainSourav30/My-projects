
import { useState } from "react";
import { useTagSpending } from "../context/useTagSpending";
import axios from "axios";
import { Pencil } from "lucide-react";

export function Goals(){
    const [goal,setGoal]= useState("");
    const [tag,setTag]=useState("");
    const [showEdit,setShowEdit]=useState(false);
    const {tags,updateTagGoal} = useTagSpending();

    const handleEditClick = (Tag, Goal) => {
        setTag(Tag);
        setGoal(Goal);
        setShowEdit(true);
      };
      const handleSave = async() => {
        if(goal <= 0){
            alert('Enter a valid Goal to update!')
            return;
        }
        console.log('hi before sending api call');
        try {
            await axios.put(
                "http://localhost:3000/api/v1/payments/update-goal",
                { tag, goal },  // Sending only tag and goal in the body
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`  // Sending userId in headers
                    }
                }
            )
            updateTagGoal(tag, goal);
            alert(`Goal set for ${tag}, new goal is ${goal}`);
            setGoal("")
            setTag("")
            setShowEdit(false);
        } catch (error) {
            console.error("Error updating goal:", error.response?.data || error.message);
        }
      };
    console.log(tags);
    const sortedTags = tags.sort((a, b) => b.TotalSpent - a.TotalSpent);
    return (
        <div className="max-w-md 2xl:max-w-xl mx-auto bg-cyan-100 h-[37vh] shadow-lg shadow-cyan-300 rounded-2xl p-6">
          <h2 className="text-xl font-bold font-sans italic text-gray-700 mb-4">SPENDING GOALS</h2>
          <div className="h-[26vh] overflow-y-auto px-2 ">
            {sortedTags.length > 0 ? (
                sortedTags.map(({ Tag, Goal, TotalSpent }, index) => {
                const percentage = Math.min((TotalSpent / Goal) * 100, 100); // Ensures it doesn't exceed 100%
                return (
                    <div key={index} className="mb-2">
                    <div className="flex justify-between mb-1">
                        <span className="text-gray-700 italic font-sans font-bold">{Tag}</span>
                        <div className="flex space-x-2">
                            <span className="text-gray-500 font-semibold">
                            <span className={`text-md font-bold ${TotalSpent < Goal ? 'text-blue-700' : 'text-red-600' }`}>₹{TotalSpent}</span> / <span className="text-red-600 text-md font-bold">₹{Goal}</span>
                            </span>
                        <button
                      onClick={() => handleEditClick(Tag, Goal)}
                      className="rounded-full h-7 w-7 flex items-center justify-center cursor-pointer hover:bg-cyan-300 text-sm font-sans font-bold italic text-gray-700"
                        >
                      <Pencil size={15} />
                    </button>
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-4 relative">
                        <div
                        className="h-4 bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` ,
                        background: "linear-gradient(to left,rgb(226, 119, 13),rgb(85, 235, 78),rgb(180, 241, 249))"}}
                        ></div>
                        {/* Amount inside the bar */}
                    </div>
                    </div>
                );
                })
            ) : (
                <p className="text-gray-500 text-sm">No Goals set yet</p>
            )}
          </div>
            {showEdit && (
            <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50">
            <div className="bg-slate-100 border-2 border-gray-400 p-6 rounded-xl shadow-lg w-80 text-center">
                <h3 className="text-lg italic font-bold mb-2">Edit Goal for {tag}</h3>
                <input
                type="number"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between mt-4">
                <button
                    onClick={() => setShowEdit(false)}
                    className="bg-gray-300 px-8 py-2 rounded-2xl font-semibold text-red-600 hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-8 py-2 font-semibold rounded-2xl hover:bg-blue-600"
                >
                    Save
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
      );
}