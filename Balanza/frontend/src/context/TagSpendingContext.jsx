import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import moment from 'moment';

const TagSpendingContext = createContext();

export function TagSpendingProvider({ children }) {
    const [tags, setTags] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [spendingHistory, setSpendingHistory] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/payments/alltags", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });

                const fetchedTags = response.data.Alltags;
                setTags(fetchedTags);

                // ✅ Calculate total spent for current month
                const currentMonth = moment().format("MMMM");
                const currentYear = moment().year();
                
                let total = 0;
                const history = [];

                fetchedTags.forEach(tag => {
                    total += tag.TotalSpent;
                    tag.History.forEach(entry => {
                        history.push(entry);
                    });
                });

                setTotalSpent(total);  // ✅ Updates on every transaction
                setSpendingHistory(history);  // ✅ Updates only when a new month starts

            } catch (error) {
                console.error("Error fetching tag spending:", error);
            }
        }
        fetchData();
    }, []);  // Runs only **once** when the component mounts


    const addTransaction = (tagName, amount) => {
        setTags(prevTags =>
            prevTags.map(tag =>
                tag.Tag === tagName ? { ...tag, TotalSpent: tag.TotalSpent + amount } : tag
            )
        );
        setTotalSpent(prevTotal => prevTotal + amount);
    };
    const updateTagGoal = (tagName, newGoal) => {
        setTags(prevTags =>
            prevTags.map(tag =>
                tag.Tag === tagName ? { ...tag, Goal: newGoal } : tag
            )
        );
    };
    
    return (
        <TagSpendingContext.Provider value={{ tags,totalSpent,spendingHistory, addTransaction,updateTagGoal }}>
            {children}
        </TagSpendingContext.Provider>
    );
}
export default TagSpendingContext;