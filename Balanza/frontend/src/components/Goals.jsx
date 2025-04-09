
import { useState } from "react";
import { useTagSpending } from "../context/useTagSpending";
import api from "../api/axios";
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
            await api.put(
                "/api/v1/payments/update-goal",
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
        <div className="w-full bg-gradient-to-r from-gray-50 to-gray-300 rounded-lg shadow-md border-none">
          <div className="p-4 space-y-10">
            <h2 className="text-2xl font-bold font-sans italic text-red-600">SPENDING GOALS</h2>
            <div className="h-0.5 bg-gradient-to-r from-gray-600 to-gray-300 rounded-full mb-3"></div>
            <div className="max-h-[250px] overflow-y-auto pr-1 scrollbar-hide">
              {sortedTags.length > 0 ? (
                  sortedTags.map(({ Tag, Goal, TotalSpent }, index) => {
                  const percentage = Math.min((TotalSpent / Goal) * 100, 100); // Ensures it doesn't exceed 100%
                  return (
                      <div key={index} className="mb-3">
                      <div className="flex justify-between mb-1">
                          <span className="text-slate-700 italic font-sans font-bold text-base">{Tag}</span>
                          <div className="flex space-x-2 items-center">
                              <span className="text-slate-600 font-semibold">
                              <span className={`text-base font-bold ${TotalSpent < Goal ? 'text-blue-600' : 'text-red-600' }`}>₹{TotalSpent}</span> / <span className="text-red-600 text-base font-bold">₹{Goal}</span>
                              </span>
                          <button
                        onClick={() => handleEditClick(Tag, Goal)}
                        className="rounded-full h-6 w-6 flex items-center justify-center cursor-pointer hover:scale-125 text-slate-700"
                          >
                        <Pencil size={14} />
                      </button>
                          </div>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 rounded-full h-4 relative">
                          <div
                          className="h-4 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` ,
                          background: "linear-gradient(to left, #4b5563,rgb(149, 155, 168), #9ca3af)"}}
                          ></div>
                      </div>
                      </div>
                  );
                  })
              ) : (
                  <p className="text-slate-500 text-sm">No Goals set yet</p>
              )}
            </div>
          </div>
            {showEdit && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white border border-slate-300 p-5 rounded-lg shadow-lg w-80 text-center">
                <h3 className="text-lg italic font-bold mb-3 text-blue-600">Edit Goal for {tag}</h3>
                <input
                type="number"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between mt-4">
                <button
                    onClick={() => setShowEdit(false)}
                    className="bg-slate-200 px-6 py-2 rounded-md font-semibold text-slate-700 hover:bg-slate-300"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-6 py-2 font-semibold rounded-md hover:bg-blue-600"
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