export function InputBox({label,placeholder}){
    return (
        <div>
            <div className="text-md font-medium text-left py-2">
                {label}
            </div>
            <input placeholder={placeholder} className="rounded-md border w-full px-2 py-1 border-slate-300"></input>
        </div>
    )
}