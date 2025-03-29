import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Warning } from "../components/Warning";
import axios from 'axios';
import { useState } from "react";

export function Signin({setIsAuthenticated}){

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
            //Find a better way to retrieve or store user info in order to access it anywhere on site
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('firstname',User.firstname)
            localStorage.setItem('lastname',User.lastname)
            setIsAuthenticated(true);
            navigate('/dashboard')

        }catch(error){
            if(error.response){
                setError( error.response.data.message);
            }
            else{setError("Unexpected error:", error.message);}
        }
    }
    return (
        <div className="bg-[#31314d] h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="w-80 h-max bg-white rounded-lg border-3 border-orange-500 shadow-2xl p-2 px-4 text-center">
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