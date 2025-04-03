import { useTagSpending } from "../context/useTagSpending";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,LabelList } from "recharts";
import moment from "moment";

export function MonthlyHistory() {
    const { totalSpent, spendingHistory } = useTagSpending();

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
        <div className="bg-cyan-100 h-[46vh] shadow-lg shadow-cyan-300 rounded-2xl p-6">
            <div className="flex flex-row gap-4">
            <h2 className="text-sm sm:text-xl font-bold italic text-gray-700 ml-17 mb-3">MONTHLY PERFORMANCE</h2>
            <h2 className="text-sm sm:text-lg font-bold italic text-gray-700 ml-17 mb-3">Total Spent this Month: <span className="text-red-500">₹{totalSpent}</span></h2>
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={updatedHistory} margin={{ top: 5, right: 10, left: 5, bottom:10 }}>
                    <LabelList dataKey="amount" position="top" fill="black" fontSize={12} fontWeight="bold" />
                    <XAxis dataKey="month" tick={{ fill: "gray", fontSize: 15, fontWeight: "bold" }} />
                    <YAxis tickFormatter={(value) => `₹${value}`}
                        tick={{ fill: "gray", fontSize: 15, fontWeight: "bold" }} />
                    <Tooltip formatter={(value) => `₹${value}`}/>
                    <Bar dataKey="amount" fill="rgb(59, 130, 246)" radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}