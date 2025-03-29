import { DashButton } from "./DashButton";
import {
    HomeIcon,
    DocumentTextIcon,
    CreditCardIcon,
    StarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
  } from "@heroicons/react/24/outline";

export default function InfoBar() {
    return (
        <div className="w-64 bg-white">
            <div className="flex flex-col h-screen justify-between  ">
                <div className="pl-20 pt-15 pb-10 ">
                            <DashButton
                    heading="Dashboard"
                    icon={<HomeIcon className="w-4 h-4" />}
                />
                <DashButton
                    heading="Transactions"
                    icon={<DocumentTextIcon className="w-4 h-4" />}
                />
                <DashButton
                    heading="Account"
                    icon={<CreditCardIcon className="w-4 h-4" />}
                />
                <DashButton
                    heading="Analytics"
                    icon={<StarIcon className="w-4 h-4" />}
                />
                <DashButton
                    heading="Table"
                    icon={<ChartPieIcon className="w-4 h-4" />}
                />
                <DashButton
                    heading="Setting"
                    icon={<Cog6ToothIcon className="w-4 h-4" />}
                />
                </div>
                <div className=" pb-20 pl-20 pt-10 justify-items-start">
                    <div className=" flex w-full ">
                        <span className="bg-[#D9D9D9] w-8 h-8 mx-2 my-1 rounded-full flex items-center justify-center"></span>
                        <div className="pt-1">
                            <div className="text-[12px]"> Admin</div>
                            <div className="font-medium text-[10px] text-[#D9D9D9]">free account</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}