import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Dashboard } from "./dashboard";
import { Heading } from "./Heading";
import { InputBox } from "./InputBox";
import { SubHeading } from "./SubHeading";
import { Warning } from "./Warning";
import axios from 'axios';
import { useState } from "react";
export function Signin(){
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);

    const handleSignIn = async () => {
        if(!username || !password){
            setError("Please enter both Email and Password");
            return;
        }
        try{
            const response = await axios.post('http://localhost:3000/api/v1/user/signin',
                {
                    username,
                    password
                }
            );
            const User ={
                firstname:response.data.firstname,
                lastname:response.data.lastname 
            };

            localStorage.setItem('token',response.data.token)
            navigate('/dashboard',{state:{user : User}})

        }catch(error){
            if(error.response){
                setError( error.response.data.message);
            }
            else{setError("Unexpected error:", error.message);}
        }
    }
    return (
        <div className="bg-slate-100 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="w-80 h-max bg-white rounded-lg border border-gray-300 shadow-2xl p-2 px-4 text-center">
                    <Heading label={'Sign In'}/>
                    <SubHeading label={'Enter your credentials to access your account'}/>
                    <InputBox onChange={e =>{
                        setUsername(e.target.value)
                    }}label={'Email'} placeholder={'Enter your Email'}/>
                    <InputBox onChange={e =>{
                        setPassword(e.target.value)
                    }}label={'Password'} placeholder={'Enter your password'}/>

                    {error && <div className="text-red-500 text-sm font-medium mt-2">{error}</div>}
                    <div className="pt-4 pb-1">
                        <Button label={'Sign In'} onClick={handleSignIn}/>
                    </div>
                    <Warning label={'Don\'t have an account?'} Buttontext={'Sign up'} to={'/signup'}/>
                </div>
            </div>
        </div>
    )
}