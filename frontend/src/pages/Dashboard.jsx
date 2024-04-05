import { useEffect, useState } from "react"
import { Balance } from "../components/Balance"
import { Topbar } from "../components/Topbar"
import axios from 'axios'
import { Searchbar } from "../components/Searchbar"

export const Dashboard = () => {
    const [balance, setBalance] = useState();
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const getBalance = async () => {
            const userBalance = await axios.get('http://localhost:3000/api/v1/account/balance', 
            {headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})

            if (userBalance) {
                setBalance(userBalance.data.balance);
            }
        }
        getBalance();
    }, [])


    useEffect(() => {
        const getUsers = async () => {
            const allUsers = await axios.get('http://localhost:3000/api/v1/user/getUsers', 
            {headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
            console.log(allUsers);
            if (allUsers) {
                setUsers([...users, ...allUsers.data.users]);
            }
        }
        getUsers();
    }, [])

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="bg-white w-[1000px] h-fit rounded-md mt-32 border-black	">
            <Topbar/>
            <Balance balance={balance}/>
            <Searchbar users={users} />
        </div>
    </div>
}