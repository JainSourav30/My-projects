export function Users(){
    const users = [{
        name:'Sourav',
        id:"sodasjdj"
    },{
        name:'Naman',
        id:"nadasjdj"
    },{
        name:'Naveen',
        id:"navdasjdj"
    },{
        name:'Jyoti',
        id:"jydasjdj"
    }];

    return(
        <div className="bg-white px-4 py-2">
            {users.map((user)=>{
                const name = user.name;
                const initial = name ? name.charAt(0).toUpperCase():"?";
                return <div key={user.id} className="m-1 p-3 flex justify-between">
                        <div className="flex justify-between  py-1">
                            <div className="w-9 h-9 px-4 rounded-full font-medium bg-slate-200 flex items-center justify-center">
                                {initial}
                            </div>
                            <div className="text-xl font-bold pt-1 px-3">
                                {name}
                            </div>
                        </div>
                        <div>
                            <button className="bg-[#18181a] py-3 px-5 rounded-lg font-medium text-white">Send Money</button>
                        </div>
                    </div>
            })}
        </div>
    )
}