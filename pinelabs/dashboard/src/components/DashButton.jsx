export function DashButton({ heading, icon }) {
    return (
      <div className="my-2 ml-2 pr-0.5">
        {/* Button with icon + text */}
        <button className="
          bg-white font-normal cursor-pointer py-2 rounded-lg text-xs 
          hover:bg-[#50D387] w-full flex items-center gap-2 px-2 text-black
        ">
          {icon}
          {heading}
        </button>
      </div>
    );
  }
