import { DashBar } from "./DashBar";
import { Users } from "./Users";

export function Dashboard(){
    const amount = 5000;
    return (
        <div className="bg-white h-screen ">
            <DashBar user={'sourav'}/>
            <div className="bg-white text-xl font-bold pt-4 pb-6 pl-7">
                Your Balance <span className="pl-3">${amount}</span>
            </div>
            <div className="bg-white text-xl font-bold pt-1 pb-6 pl-7 pr-7">
                Users
                <div className="pt-4 text-lg font-medium">
                    <input placeholder="Search Users.." className="px-4 py-2 rounded-lg border border-slate-400 w-full "></input>
                </div>
            </div>
            <Users/>
        </div>
    )
}