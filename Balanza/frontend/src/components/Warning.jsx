import { Link } from "react-router-dom"
export function Warning({label,Buttontext,to}){
    return(
        <div className="pb-2 font-medium text-sm flex justify-center">
            <div>
                {label}
            </div>
            <Link to={to} className="underline pl-1 cursor-pointer">
                {Buttontext}
            </Link>
        </div>
    )
}