export function DropDown({index,time}){
    return(
        <div className="flex-1  text-sm mx-12">
        <button className="flex flex-wrap items-center w-full justify-between gap-1 bg-white  px-3 py-2 rounded-2xl ">
            <div>
                <span className="text-gray-500">{index}:</span> 
                <span className="font-semibold text-[13px] pl-2">{time}</span>
            </div>
            <div>
                <span className="text-[8px] pr-2">▼</span>
            </div>
        </button>
        </div>
    )
}