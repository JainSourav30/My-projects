import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import moment from 'moment';

const TagSpendingContext = createContext();

export function TagSpendingProvider({ children }){
    const [tags, setTags] = useState([]);
    const [transactions,setTransactions]= useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [spendingHistory, setSpendingHistory] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };    

    useEffect(() => {
            async function fetchData() {
                try {
                    const response = await axios.get("http://localhost:3000/api/v1/payments/alltags", {
                        headers: { Authorization: `Bearer ${token}` }
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

                try{
                    await axios.get("http://localhost:3000/api/v1/account/debit",{
                        headers:{Authorization:`Bearer ${token}`}
                      }).then((response)=>{
                        setTransactions(response.data.transactionarray);
                      })
                }catch(error){
                    console.error("Error fetching transactions:", error);
                }
            }
            fetchData();
    }, [token]);  // Runs only **once** when the component mounts
    

        const addTransaction = (newtransaction) => {
            setTags(prevTags =>
                prevTags.map(tag =>
                    tag.Tag === newtransaction.Tag ? { ...tag, TotalSpent: tag.TotalSpent + newtransaction.Amount } : tag
                )
            );
            setTotalSpent(prevTotal => prevTotal + newtransaction.Amount);
            setTransactions(prev => [...prev, newtransaction]);
        };

        const updateTagGoal = (tagName, newGoal) => {
            setTags(prevTags =>
                prevTags.map(tag =>
                    tag.Tag === tagName ? { ...tag, Goal: newGoal } : tag
                )
            );
        };
        const deleteTransaction = (tagName,amount,id)=>{
            setTransactions(prevtrans => 
                prevtrans.filter(trans => trans._id !== id)
            );

        setTags(prevTags =>
            prevTags.map(tag =>
                tag.Tag === tagName ? { ...tag, TotalSpent: tag.TotalSpent - amount } : tag
            )
        );
        setTotalSpent(prevTotal => prevTotal - amount);
        }
    
    return (
        <TagSpendingContext.Provider value={{ transactions,tags,totalSpent,spendingHistory,deleteTransaction, login,addTransaction,updateTagGoal }}>
            {children}
        </TagSpendingContext.Provider>
    );
}
export default TagSpendingContext;