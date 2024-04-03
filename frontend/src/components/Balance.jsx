import { useEffect } from "react"

export const Balance = ({balance}) => {
    return <div className="flex gap-2 sm:gap-4 m-8 font-semibold text-lg">
        <div>Your Balance</div>
        <div>{balance}</div>
    </div>
}