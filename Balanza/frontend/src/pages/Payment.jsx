import { useNavigate, useSearchParams } from "react-router-dom";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import api from "../api/axios";

export function Payment(){
    const [searchparams] = useSearchParams();
    const [amount,setAmount] =useState(0);
    const [transactiontype,setTransactiontype] = useState('');
    const [error,setError] =useState('');
    const [success,setSuccess]=useState('');
    const [loading,setLoading]=useState(false);
    const id = searchparams.get('id');
    const firstname = searchparams.get('firstname');
    const lastname = searchparams.get('secondname');
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const MakePayment = async() => {
        try{
            if(amount === '0' || !amount){
                setError("Enter amount to make payment")
                return;
            }
            if(transactiontype==='' || !transactiontype){
                setError("Enter Payment Type")
                return;
            }
            setLoading(true);
            await api.post('/api/v1/account/transfer',{
                amount,
                to:id,
                transactiontype
            },{
                headers: {Authorization : `Bearer ${token}`}
            })
            setTimeout(()=>{
                setSuccess(`${amount}`+"₹"+" "+"Sent Successfully to"+" "+firstname+" "+lastname);
                setLoading(false);
            },1000)
        }catch(e){
            if(e.response){
                setError(e.response.data.message)
            }
            else{
                setError("Facing some error while making payment")
            }
            setLoading(false);
        }
    }

    return(
        <div className="bg-[#31314d] h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col pb-10 h-max flex justify-center items-center">
                    <h2 className="text-5xl pb-5 text-[#f5a623] italic font-mono font-bold">
                        BALANZA
                    </h2>
                    <p className="text-3xl text-white font-bold"><span className="text-[#ffb385]">TRACK</span> . <span className="text-[#a18aff]">SAVE</span> . <span className="text-[#ff6f61]">GROW</span></p>
            </div>

            {/*MAIN PAYMENT CARD*/}
            <div className="flex flex-col justify-center">
                <div className="bg-white h-max w-100 text-center rounded-md px-4 p-2 pb-6 border border-gray-300 shadow-2xl">
                    <Heading label={'Send Money'}/>
                    <div className="mt-10 ml-4 flex flex-row">
                        <div className="bg-[#28c45c] text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center">
                            {firstname[0].toUpperCase()}
                        </div>
                        <div className="text-3xl font-bold ml-4 mt-1">
                            {firstname} {lastname}
                        </div>
                    </div>
                    <div className="px-3 py-3 font-medium">
                        <InputBox onChange={e => {
                            setAmount(e.target.value)
                        }
                        }label={'Amount (in Rs)'} placeholder={'Enter the amount'}/>
                    </div>
                    <div className="px-3 py-3 font-medium">
                        <InputBox onChange={(e)=>{
                            setTransactiontype(e.target.value)
                        }} label={'Payment Type'} placeholder={'Purpose of Payment'}/>
                    </div>
                    {error && <div className="text-red-500 text-md font-medium mt-2">{error}</div>}
                    {success && <div className="text-blue-500 text-md font-medium mt-2">{success}</div>}
                    <div className="px-3 py-3">
                        <button onClick={MakePayment} disabled={loading} className={`${loading ? "bg-gray-400 cursor-not-allowed" :"hover:bg-green-600 cursor-pointer"} rounded-lg py-2 w-full bg-[#28c45c] text-white font-medium text-md`}>{loading?'Processing..':'Initiate Tranfer'}</button>
                    </div>
                    {success && <div>
                            <button onClick={() => {
                                setTimeout(() => {
                                    navigate('/dashboard');
                                }, 1000);
                            }} className=" px-3 py-2 rounded-md hover:bg-blue-700 bg-blue-500 text-white text-md font-medium cursor-pointer ">Go to DashBoard</button>
                        </div>}


                </div>
            </div>
        </div>
    )
}