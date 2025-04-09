//sign up info color : #c6c8cb

import api from "../api/axios";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Warning } from "../components/Warning";
import { Navigate, useNavigate } from 'react-router-dom';

export function Signup({setIsAuthenticated}){
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [errors,setErrors] = useState({});
    const navigate = useNavigate();

    const validateInputs = () => {
        const newErrors = {};

        if (!firstname.trim()) newErrors.firstname = "First name is required";
        if (!lastname.trim()) newErrors.lastname = "Last name is required";

        if (!username.trim()) {
            newErrors.username = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(username)) {
            newErrors.username = "Invalid email format";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async () => {
        if (!validateInputs()) return;
        try{
            const response = await api.post("/api/v1/user/signup",{
               username,
               firstname,
               lastname,
               password
           },
       );
       
       localStorage.setItem("token",response.data.token)
       localStorage.setItem("firstname",firstname)
       setIsAuthenticated(true)
       setTimeout(()=>{
           navigate('/dashboard');
        },1000)
       }catch (error) {
        if (error.response && error.response.data.message) {
            alert(error.response.data.message);
        } else {
            alert("Signup failed. Please try again.");
        }
        }   
    }

    return (
        <div className='bg-[#31314d] h-screen flex flex-col items-center justify-center'>
            <div className="flex flex-col pb-10 h-max flex justify-center items-center">
                    <h2 className="text-3xl md:text-5xl pt-5 pb-3 md:pb-5 text-[#f5a623] italic font-mono font-bold">
                        BALANZA
                    </h2>
                    <p className="text-xl md:text-3xl text-white font-bold"><span className="text-[#ffb385]">TRACK</span> . <span className="text-[#a18aff]">SAVE</span> . <span className="text-[#ff6f61]">GROW</span></p>
            </div>
            <div className="flex flex-col justify-center">
                <div className="rounded-lg border-3 border-orange-500 shadow-2xl bg-white w-90 text-center p-2 h-max px-4 max-w-sm mx-auto">
                    <Heading label={'Sign Up'} />
                    <SubHeading label={'Enter your information to create an account'}/>

                    <InputBox
                        onChange={e => setFirstName(e.target.value)}
                        label="First Name"
                        placeholder="Enter your first name"
                        error={errors.firstname}
                    />  
                    
                    <InputBox onChange={ e => {
                        setLastName(e.target.value);
                    }} label={'Last Name'} placeholder={'Enter your last name'}
                        error={errors.lastname}
                    />
                    
                    <InputBox onChange={ e => {
                        setUsername(e.target.value);
                    }} label={'Email'} placeholder={'Enter valid Email'}
                        error={errors.username}
                    />
                    
                    <InputBox onChange={ e => {
                        setPassword(e.target.value);
                    }} label={'Password'} placeholder={'Enter Password'}
                        error={errors.password}
                    />
                    
                    <div className="pt-3 py-1">
                        <Button label={'Sign Up'} onClick={handleSignup}/>
                    </div>
                    <Warning label={'Already have an account?'} Buttontext={'Sign in'} to={'/signin'}/>
                </div>
            </div>
        </div>
    )
}