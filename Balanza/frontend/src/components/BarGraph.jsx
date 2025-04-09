import { useTagSpending } from "../context/useTagSpending";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import moment from "moment";
import { useState, useEffect } from "react";

export function MonthlyHistory() {
    const { totalSpent, spendingHistory } = useTagSpending();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Add responsive window size detection
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Get current month & year
    const currentMonth = moment().format("MMMM");
    const currentYear = moment().year();

    // Determine the first recorded month (User's signup month)
    let firstRecordedEntry = spendingHistory.length > 0 ? spendingHistory[0] : { month: currentMonth, year: currentYear };
    let firstMonthIndex = moment().month(firstRecordedEntry.month).format("M") - 1; // Convert to 0-based index
    let firstYear = firstRecordedEntry.year;

    // Generate the next 5 months dynamically
    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
        const date = moment().year(firstYear).month(firstMonthIndex + i);
        return { month: date.format("MMMM"), year: date.year(), amount: 0 };
    });

    // Create a lookup map for history data
    const historyMap = new Map(spendingHistory.map(entry => [`${entry.month}-${entry.year}`, entry.amount]));

    // Merge fetched data with dynamically generated months
    const updatedHistory = lastSixMonths.map(({ month, year }) => ({
        month,
        year,
        amount: historyMap.get(`${month}-${year}`) || (month === currentMonth && year === currentYear ? totalSpent : 0),
    }));

    return (
        <div className="bg-gradient-to-r from-slate-50 to-slate-300 h-[50vh] shadow-lg shadow-cyan-300 rounded-2xl px-2 md:px-6 pt-6 md:pt-11">
            <div className="flex flex-row gap-4">
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart 
                    data={updatedHistory} 
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    barSize={isMobile ? 20 : 30}
                >
                    <LabelList 
                        dataKey="amount" 
                        position="top" 
                        fill="black" 
                        fontSize={isMobile ? 10 : 12} 
                        fontWeight="bold" 
                    />
                    <XAxis 
                        dataKey="month" 
                        tick={{ 
                            fill: "gray", 
                            fontSize: isMobile ? 15 : 18, 
                            fontWeight: "bold" 
                        }}
                        tickFormatter={(value) => isMobile ? value.substring(0, 3) : value}
                    />
                    <YAxis 
                        tickFormatter={(value) => `₹${value}`}
                        tick={{ 
                            fill: "gray", 
                            fontSize: isMobile ? 12 : 15, 
                            fontWeight: "bold" 
                        }}
                        width={isMobile ? 50 : 60}
                    />
                    <Tooltip formatter={(value) => `₹${value}`}/>
                    <Bar dataKey="amount" fill="rgb(59, 130, 246)" radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}