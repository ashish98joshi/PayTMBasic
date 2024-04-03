import { useEffect, useState } from "react"
import { Balance } from "../components/Balance"
import { Topbar } from "../components/Topbar"
import axios from 'axios'
import { Searchbar } from "../components/Searchbar"

export const Dashboard = () => {
    const [balance, setBalance] = useState('');
    // const BACKEND_URL = 'http://localhost:3000/api/v1/account/balance'
    // useEffect(() => {
    //     const getBalance = async () => {
    //         const balance = await axios.get()
    //     }
    // }, [])

    const users = [{
        name: 'Ashish Joshi'
    }]
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="bg-white w-[1000px] h-fit rounded-md mt-32 border-black	">
            <Topbar/>
            <Balance balance={'$10000'}/>
            <Searchbar users={users}/>
        </div>
    </div>
}