import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Dashboard } from "./dashboard";
import { Heading } from "./Heading";
import { InputBox } from "./InputBox";
import { SubHeading } from "./SubHeading";
import { Warning } from "./Warning";

export function Signin(){
    const navigate = useNavigate();
    return (
        <div className="bg-slate-100 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="w-80 h-max bg-white rounded-lg border border-gray-300 shadow-2xl p-2 px-4 text-center">
                    <Heading label={'Sign In'}/>
                    <SubHeading label={'Enter your credentials to access your account'}/>
                    <InputBox label={'Email'} placeholder={'Enter your Email'}/>
                    <InputBox label={'Password'} placeholder={'Enter your password'}/>
                    <div className="pt-4 pb-1">
                        <Button label={'Sign In'} onClick={()=>navigate('/dashboard')}/>
                    </div>
                    <Warning label={'Don\'t have an account?'} Buttontext={'Sign up'} to={'/signup'}/>
                </div>
            </div>
        </div>
    )
}