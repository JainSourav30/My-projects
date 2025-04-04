import { useNavigate } from "react-router-dom";

export function ProfileButton({setIsAuthenticated}){
    const navigate = useNavigate();
    function Handlelogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        setIsAuthenticated(false);
        navigate('/');
    }
    return(
        <div className="flex flex-col items-center justify-center">
            <button className="text-md cursor-pointer hover:bg-slate-100 py-2 border border-slate-200 w-full" onClick={Handlelogout}>Logout</button>
        </div>
    )
}