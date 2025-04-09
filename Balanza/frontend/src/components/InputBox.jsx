export function InputBox({label,placeholder,onChange,error}){
    return (
        <div>
            <div className="text-md font-medium text-left py-2">
                {label}
            </div>
            <input
                type="text"
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-2 border rounded"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    )
}

// build a more visually appearing Input box in place of this

// Use Tailwind and it's transformation features to style it better

//