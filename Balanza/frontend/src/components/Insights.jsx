import { useEffect, useState } from "react";
import api from "../api/axios";

import { Sparkles } from "lucide-react";  // AI Icon (✨)

export default function InsightsDisplay() {
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchInsights() {
            try {
                const token = localStorage.getItem("token");
                const response = await api.post(
                    "/api/v1/ai/analyze-spending",
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
        <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-100 rounded-lg shadow-lg border-none">
            <div className="p-4 space-y-8">
                <div className="flex items-center gap-2">
                    <Sparkles size={22} className="text-yellow-500" />
                    <h2 className="text-2xl font-bold font-sans italic text-gray-600">
                        <span className="font-bold text-blue-600">SMART</span> Insights
                    </h2>
                </div>
                <div className="h-0.5 bg-gradient-to-r from-gray-600 to-gray-300 rounded-full mb-3"></div>
        
                <div className="h-[250px] overflow-y-auto scrollbar-hide pr-2 mb-9">
                    {loading ? (
                        <p className="text-gray-600 text-xl italic font-semibold pl-2">Our AI is still crunching the numbers... Check back soon for smart spending insights!</p>
                    ) : (
                        <>
                            {insights.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-4">
                                    {insights.map((insight, index) => {
                                        const [heading, ...content] = insight.split(":");
                                        return (
                                            <li key={index} className="text-gray-700 text-lg">
                                                <span className="font-bold">{heading.toUpperCase().trim()}:</span>
                                                {content.length > 0 && ` ${content.join(":").trim()}`}
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="text-gray-600 text-lg font-semibold pl-2">AI is ready, but your wallet seems untouched! Log some spending to unlock insights.</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}