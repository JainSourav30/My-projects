export function InputBox({label,placeholder,onChange}){
    return (
        <div>
            <div className="text-md font-medium text-left py-2">
                {label}
            </div>
            <input onChange={onChange} placeholder={placeholder} className="rounded-md border w-full px-2 py-1 border-slate-300"></input>
        </div>
    )
}

// build a more visually appearing Input box in place of this

// Use Tailwind and it's transformation features to style it better

//