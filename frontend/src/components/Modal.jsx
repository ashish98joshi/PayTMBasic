import axios from 'axios'
import { Button } from './Button'
import { useState } from 'react';

export const Modal = ({setModalOpen, username, userId, setBalance}) => {
    const [amount, setAmount] = useState();
    
    return <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="relative top-40 sm:left-[550px] md:left-[350px] lg:left-[700px] h-80 w-96 bg-white rounded-sm">
            <div className="flex flex-col gap-3 ">
                <div className="font-bold text-xl ml-32 mt-10">Send Money</div>
                <div className="flex gap-2 items center">
                    <div className="bg-slate-300 rounded-full w-9 h-9 text-center mt-8 ml-8 pt-1">{username[0]}</div>
                    <div className="font-semibold mt-8 pt-1">{username}</div>
                </div>
                <div className="text-sm font-semibold ml-8">Amount (in Rs)</div>
                <input
                    onChange={(e) => {
                        setAmount(e.target.value);
                    }}
                    type="text" 
                    placeholder="Enter Amount" 
                    className="rounded-md outline-slate-300 border border-slate-300 mt-1 ml-7 mr-7 placeholder:p-2 placeholder:text-sm p-1 caret-slate-300">  
                </input>
                <div className="flex gap-2 justify-center pl-2">
                    <Button label={"Close"} onClick={() => {setModalOpen(false)}}/>
                    <Button onClick={async () => {
                        const response = await axios.post('http://localhost:3000/api/v1/account/transfer', {
                            to: userId,
                            amount: amount
                        }, {
                            headers: {
                                authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                        if (response.status == 200) {
                            setModalOpen(false);
                            setBalance(prev => prev - amount);
                        }
                    }} label={"Initiate Transfer"}/>
                </div>
            </div>
        </div>
    </div>  
} 