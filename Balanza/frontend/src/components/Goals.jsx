
import { useTagSpending } from "../context/useTagSpending";

export function Goals(){
    const {tags} = useTagSpending();
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
                        <span className="text-gray-500 font-semibold">
                        <span className={`text-md font-bold ${TotalSpent < 2000 ? 'text-blue-700' : 'text-red-600' }`}>₹{TotalSpent}</span> / <span className="text-red-600 text-md font-bold">₹{Goal}</span>
                        </span>
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
        </div>
      );
}