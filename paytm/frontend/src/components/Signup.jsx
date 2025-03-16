//sign up info color : #c6c8cb

import { Button } from "./Button";
import { Dashboard } from "./dashboard";
import { Heading } from "./Heading";
import { InputBox } from "./InputBox";
import { SubHeading } from "./SubHeading";
import { Warning } from "./Warning";

export function Signup(){
    return (
        <div className='bg-slate-300 h-screen flex justify-center'>
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={'Sign Up'} />
                    <SubHeading label={'Enter your information to create an account'}/>
                    <InputBox label={'First Name'} placeholder={'Enter your first name'}/>
                    <InputBox label={'Last Name'} placeholder={'Enter your last name'}/>
                    <InputBox label={'Email'} placeholder={'Enter valid Email'}/>
                    <InputBox label={'Password'} placeholder={'Enter Password'}/>
                    <div className="pt-3 py-1">
                        <Button label={'Sign Up'} onClick={<Dashboard/>}/>
                    </div>
                    <Warning label={'Already have an account?'} Buttontext={'Sign in'} to={'/signin'}/>
                </div>
            </div>
        </div>
    )
}