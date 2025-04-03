
import { DashBar } from "../components/DashBar";
import { Addpayment } from "../components/Addpayment";
import { Goals } from "../components/Goals";
import {  MonthlyHistory } from "../components/BarGraph";
import { MonthBarGraph } from "../components/MonthlySpent";
import InsightsDisplay from "../components/Insights";


export function Dashboard({setIsAuthenticated}){
    
    
    const firstname = localStorage.getItem('firstname');
    
    //const [balance,setBalance] = useState(null);
    //const lastname = localStorage.getItem('lastname');
    //const navigate = useNavigate();


    //Getting account balance from here
    // //useEffect(()=>{
    //     const token = localStorage.getItem('token');
    //     if(!token){
    //         navigate('/');
    //         return;
    //     }
    //     axios.get("http://localhost:3000/api/v1/account/balance",
    //         {
    //             headers:{Authorization: `Bearer ${token}`}
    //         }
    //     ).then((response)=>{
    //         setBalance(response.data.balance)
    //     })
    // },[navigate])
    
    return (
        <div className="bg-gray-200 h-full md:h-dvh  space-y-2 md:space-y-0">
            <DashBar setIsAuthenticated={setIsAuthenticated} user={firstname}/>
            <div className="flex-1  space-y-5 lg:space-y-5">
                <div className=" grid grid-cols-1 md:grid-cols-3 space-y-2 md:space-y-0 gap-10 mx-10 py-2 ">
                    <div><Addpayment /></div>
                    <div>
                        <Goals />
                    </div>
                    <div className="">
                        <InsightsDisplay/>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 space-y-2 md:space-y-0 gap-10 mx-10 mb-3">
                    <div className="">
                        <MonthBarGraph />
                    </div>
                    <div className="">
                        <MonthlyHistory/>
                    </div>
                </div>
            </div>
        </div>
    )
}