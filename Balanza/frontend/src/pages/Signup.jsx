//sign up info color : #c6c8cb
import axios from 'axios';
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Warning } from "../components/Warning";
import { Navigate, useNavigate } from 'react-router-dom';

export function Signup(){
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
               username,
               firstname,
               lastname,
               password
           },
       );
       
       localStorage.setItem("token",response.data.token)
       setTimeout(()=>{
           navigate('/dashboard',{state :{user : firstname}});
        },1000)
       }catch(error){
           if (error.response) {
               console.error("Signup failed:", error.response.data.message); // Logs backend error message
           } else {
               console.error("Unexpected error:", error.message);
           }
       }
    }

    return (
        <div className='bg-[#31314d] h-screen flex flex-col items-center justify-center'>
            <div className="flex flex-col pb-10 h-max flex justify-center items-center">
                    <h2 className="text-5xl pb-5 text-[#f5a623] italic font-mono font-bold">
                        BALANZA
                    </h2>
                    <p className="text-3xl text-white font-bold"><span className="text-[#ffb385]">TRACK</span> . <span className="text-[#a18aff]">SAVE</span> . <span className="text-[#ff6f61]">GROW</span></p>

            </div>
            <div className="flex flex-col justify-center">
                <div className="rounded-lg border-3 border-orange-500 shadow-2xl bg-white w-90 text-center p-2 h-max px-4">
                    <Heading label={'Sign Up'} />
                    <SubHeading label={'Enter your information to create an account'}/>

                    <InputBox onChange={ e => {
                        setFirstName(e.target.value);
                    }} label={'First Name'} placeholder={'Enter your first name'}/>
                    
                    <InputBox onChange={ e => {
                        setLastName(e.target.value);
                    }} label={'Last Name'} placeholder={'Enter your last name'}/>
                    
                    <InputBox onChange={ e => {
                        setUsername(e.target.value);
                    }} label={'Email'} placeholder={'Enter valid Email'}/>
                    
                    <InputBox onChange={ e => {
                        setPassword(e.target.value);
                    }} label={'Password'} placeholder={'Enter Password'}/>
                    
                    <div className="pt-3 py-1">
                        <Button label={'Sign Up'} onClick={handleSignup}/>
                    </div>
                    <Warning label={'Already have an account?'} Buttontext={'Sign in'} to={'/signin'}/>
                </div>
            </div>
        </div>
    )
}