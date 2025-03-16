export function DashBar({user}){
    const initial = user ? user.charAt(0).toUpperCase():"?" ;
    return(
        <div className="bg-white py-4 px-2 flex justify-between border border-b-slate-200">
            <div className="pl-5 text-2xl font-bold">
                Payments App
            </div>
            <div className="pr-4 text-xl font-medium flex justify between">
                <div className="pr-4 pt-1">
                    Hello, {user}
                </div>
                <div className="bg-slate-200 rounded-full px-4 w-9 h-9 flex items-center justify-center">
                    {initial}
                </div>
            </div>
        </div>
    )
}