export const Input = ({placeholder, label, isPassword}) => {
    return <div> 
        <div className="text-left pt-4 pb-2 font-semibold">
            {label}
        </div>
        <input type={`${!isPassword ? 'text' : 'password'}`} className="border-2 rounded-md w-full px-2 py-1 focus:outline-none caret-slate-400" placeholder={placeholder}></input>
    </div>
}