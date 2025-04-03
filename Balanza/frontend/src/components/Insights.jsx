import { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles } from "lucide-react";  // AI Icon (✨)

export default function InsightsDisplay() {
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchInsights() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post(
                    "http://localhost:3000/api/v1/ai/analyze-spending",
                    {}, 
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setInsights(response.data.insightsArray || []);
            } catch (err) {
                setError("Failed to load insights");
            } finally {
                setLoading(false);
            }
        }
        fetchInsights();
    }, []);


    if (error) return <p className="text-red-500">{error}</p>;
    
    return (
        <div className="max-w-md 2xl:max-w-xl mx-auto bg-cyan-100 h-[37vh] shadow-lg shadow-cyan-300 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
                <Sparkles size={20} className="text-yellow-500" />
                <h2 className="text-xl font-bold font-sans italic text-gray-700">
                    <span className="font-bold text-xl text-[#00AEEF]">SMART</span> Insights
                </h2>
            </div>
    
            {loading ? (
                <p className="text-gray-500 text-xl italic font-bold pl-5">Our AI is still crunching the numbers... Check back soon for smart spending insights!</p>
            ) : (
                <div className="h-[26vh] overflow-y-auto">
                    {insights.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-3">
                            {insights.map((insight, index) => {
                                const [heading, ...content] = insight.split(":");
                                return (
                                    <li key={index} className="text-gray-700">
                                        <span className="font-bold">{heading.toUpperCase().trim()}:</span>
                                        {content.length > 0 && ` ${content.join(":").trim()}`}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-xl font-bold pl-5">AI is ready, but your wallet seems untouched! Log some spending to unlock insights.</p>
                    )}
                </div>
            )}
        </div>
    );
}