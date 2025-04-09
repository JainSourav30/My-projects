import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import api from "../api/axios";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Warning } from "../components/Warning";
import { useState } from "react";
import { useTagSpending } from "../context/useTagSpending";

export function Signin({setIsAuthenticated}){

    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);
    const {login} = useTagSpending();
    const [showResetForm, setShowResetForm] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetMessage, setResetMessage] = useState('');

    const handleSignIn = async () => {
        if(!username || !password){
            setError("Please enter both Email and Password");
            return;
        }
        try{
            const response = await api.post('/api/v1/user/signin',
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
            const token = response.data.token;
            login(token);
            localStorage.setItem('firstname',User.firstname)
            localStorage.setItem('lastname',User.lastname)
            setIsAuthenticated(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 500);

        }catch(error){
            if(error.response){
                setError( error.response.data.message);
            }
            else{setError(`Unexpected error:", ${error.message}`);}
        }
    }

    const handleResetPassword = async () => {
        setError(null);
        setResetMessage('');
        
        if(!username) {
            setResetMessage("Please enter your email address");
            return;
        }
        
        if(newPassword !== confirmPassword) {
            setResetMessage("Passwords don't match");
            return;
        }
        
        if(newPassword.length < 6) {
            setResetMessage("Password must be at least 6 characters");
            return;
        }
        
        try {
            await api.post('/api/v1/user/reset-password', {
                username,
                newPassword
            });
            
            setResetMessage("Password updated successfully!");
            setTimeout(() => {
                setShowResetForm(false);
                setNewPassword('');
                setConfirmPassword('');
                setResetMessage('');
            }, 2000);
        } catch(error) {
            if(error.response) {
                setResetMessage(error.response.data.message);
            } else {
                setResetMessage(`Unexpected error: ${error.message}`);
            }
        }
    }


    return (
        <div className="bg-[#31314d] h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col pb-7 h-max flex justify-center items-center">
                <h2 className="text-3xl md:text-5xl pb-3 md:pb-5 text-[#f5a623] italic font-mono font-bold">
                    BALANZA
                </h2>
                <p className="text-xl md:text-3xl text-white font-bold"><span className="text-[#ffb385]">TRACK</span> . <span className="text-[#a18aff]">SAVE</span> . <span className="text-[#ff6f61]">GROW</span></p>
            </div>
            <div className="flex flex-col justify-center">
                <div className="w-80 h-max bg-white rounded-lg border-3 border-orange-500 shadow-2xl p-2 px-4 text-center">
                    {!showResetForm ? (
                        <>
                            <Heading label={'Sign In'}/>
                            <SubHeading label={'Enter your credentials to access your account'}/>
                            <InputBox onChange={e =>{
                                setUsername(e.target.value)
                            }} label={'Email'} placeholder={'Enter your Email'}/>
                            <InputBox onChange={e =>{
                                setPassword(e.target.value)
                            }} label={'Password'} placeholder={'Enter your password'}/>
                            
                            <div className="text-right mb-2">
                                <button 
                                    className="text-blue-600 text-sm hover:underline"
                                    onClick={() => {
                                        setShowResetForm(true);
                                        setPassword(''); // Clear password field
                                    }}
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            {error && <div className="text-red-500 text-sm font-medium mt-2">{error}</div>}
                            <div className="pt-4 pb-1">
                                <Button label={'Sign In'} onClick={handleSignIn}/>
                            </div>
                            <Warning label={'Don\'t have an account?'} Buttontext={'Sign up'} to={'/signup'}/>
                        </>
                    ) : (
                        <>
                            <Heading label={'New Credentials'}/>
                            <SubHeading label={'Enter your email and new password'}/>
                            <InputBox 
                                onChange={e => setUsername(e.target.value)}
                                label={'Email'} 
                                placeholder={'Enter your Email'}
                                value={username}
                            />
                            <InputBox 
                                onChange={e => setNewPassword(e.target.value)}
                                label={'New Password'} 
                                placeholder={'Enter new password'}
                                type="password"
                            />
                            <InputBox 
                                onChange={e => setConfirmPassword(e.target.value)}
                                label={'Confirm Password'} 
                                placeholder={'Enter password again'}
                                type="password"
                            />
                            
                            {resetMessage && <div className={`text-sm font-medium mt-2 ${resetMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{resetMessage}</div>}
                            
                            <div className="pt-4 pb-1">
                                <Button label={'Update Password'} onClick={handleResetPassword}/>
                            </div>
                            <div className="">
                                <button 
                                    className="text-black text-sm md:text-lg hover:underline"
                                    onClick={() => setShowResetForm(false)}
                                >
                                    Back to Sign In
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}