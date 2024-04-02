import {Link} from 'react-router-dom'
export const Footer = ({label, buttonText, to}) => {
    return <div className="flex justify-center font-semibold">
        <p>{label}</p>
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>
            {buttonText}
        </Link>     
    </div>
}