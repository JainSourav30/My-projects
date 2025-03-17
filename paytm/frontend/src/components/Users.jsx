import { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate } from "react-router-dom";


export function Users({Self}){
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("");
    const navigate = useNavigate();
    const First = Self?.firstname || "";
    const Last = Self?.lastname || "";

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then((response)=>{
            setUsers(response.data.user)
        })
    },[filter])

    return(
        <div className="bg-white px-4 py-2">

            <div className="bg-white text-xl font-bold pt-1 pb-6 pl-7 pr-7">
                Users
                <div className="pt-4 text-lg font-medium">
                    <input onChange={e =>{
                        setFilter(e.target.value)
                    }} placeholder="Search Users.." className="px-4 py-2 rounded-lg border border-slate-400 w-full "></input>
                </div>
            </div>
            {users.map((user,index)=>{
                if(First === user.firstname && Last === user.lastname ){
                    return;
                }
                const firstname = user.firstname;
                const secondname = user.lastname;
                const initial = firstname ? firstname.charAt(0).toUpperCase():"?";
                return <div key={index} className="mx-3 p-3 rounded-md flex justify-between even:bg-blue-200">
                        <div className="flex justify-between text-gray-800 py-1">
                            <div className="w-9 h-9 px-4 rounded-full font-medium bg-slate-200 flex items-center justify-center">
                                {initial}
                            </div>
                            <div className="text-xl font-bold pt-1 px-3">
                                {firstname} {secondname}
                            </div>
                        </div>
                        <div>
                            <button onClick={e =>{
                                navigate('/payment?id='+ user._id + '&firstname=' + user.firstname + "&secondname="+ user.lastname);
                            }

                            }className="bg-gray-800 py-3 px-5 rounded-lg font-medium text-white hover:bg-[#18181a] cursor-pointer">Send Money</button>
                        </div>
                    </div>
            })}
        </div>
    )
}