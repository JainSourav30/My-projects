import { Heading } from "./Heading";
import { InputBox } from "./InputBox";

export function Payment(){
    return(
        <div className="bg-slate-100 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white h-max w-100 text-center rounded-md px-4 p-2 pb-6 border border-gray-300 shadow-2xl">
                    <Heading label={'Send Money'}/>
                    <div className="mt-10 ml-4 flex flex-row">
                        <div className="bg-[#28c45c] text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center">
                            N
                        </div>
                        <div className="text-3xl font-bold ml-4 mt-1">
                            Naveen Jain
                        </div>
                    </div>
                    <div className="px-3 py-3 font-medium">
                        <InputBox label={'Amount (in Rs)'} placeholder={'Enter the amount'}/>
                    </div>
                    <div className="px-3 py-3">
                        <button className="hover:bg-green-600 cursor-pointer rounded-lg py-2 w-full bg-[#28c45c] text-white font-medium text-md">Initiate Tranfer</button>
                    </div>

                </div>
            </div>
        </div>
    )
}