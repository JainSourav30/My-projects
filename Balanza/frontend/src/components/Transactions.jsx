
import api from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ShowTransactions(){
    const [debitArray,setDebitarray] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/');
            return;
        }
        try{
            api.get('/api/v1/account/debit',{
                headers:{Authorization:`Bearer ${token}`}
            }).then((response)=>{
                setDebitarray(response.data.transactionarray);
            })
        }catch(error) {
            console.error("Error fetching transactions:", error);
        }
        },[navigate]);



        return (
            <div className="bg-yellow-200">
                <div>
                    hi there
                </div>
                <div>
                    {debitArray?.length > 0 ? (
                        debitArray.map((transaction, index) => {
                            const debitamount = transaction.Amount;
                            const Rfirstname = transaction.recieverfirst;
                            const Rlastname = transaction.recieverlast;
                            const typeofdebit = transaction.TransactionType;

                            return(
                                <div key={index}>{debitamount} {Rfirstname} {Rlastname} {typeofdebit}</div>
                            ) 
                        })
                    ) : (
                        <p>Loading or No transactions found</p>
                    )}
                </div>
            </div>
        );
}