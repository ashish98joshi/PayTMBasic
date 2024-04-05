import { Fragment, useEffect, useState } from 'react'
import { Button } from './Button'
import { Modal } from './Modal'
import axios from 'axios'

export const Searchbar = ({users, setUsers, setBalance}) => {
    const [filteredUsers, setFilteredUsers] = useState('');

    useEffect(() => {
        if (filteredUsers !== '') {
            axios.get('http://localhost:3000/api/v1/user/bulk?filter=' + filteredUsers, 
                {headers: {authorization: 'Bearer ' + localStorage.getItem('token')}}
            )
            .then(response => {
                console.log(response);
                setUsers(response.data.user);
            })
        }
    }, [filteredUsers])


    return <div className="flex flex-col m-8 text-lg">
        <div className="font-semibold">Users</div>
        <div>
            <input 
                onChange={(e) => {
                    setFilteredUsers(e.target.value);
                }}
                type="text" 
                placeholder="Search users..." 
                className="w-full focus:outline-black caret-slate-300 p-2 mt-4 outline-black border font-light text-sm border-slate-300 rounded">
            </input>
        </div>
        <div className='mt-4'>
            {users.map((user, idx) => {
                return <UserList key={idx} user={user} setBalance={setBalance}/>
            })}
        </div>
    </div>
}

function UserList({user, setBalance}) {
    const [modalOpen, setModalOpen] = useState(false);

    function setModal() {
        setModalOpen(true);
    }

    return <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
            <div className="bg-slate-300 rounded-full w-9 h-9 text-center pt-1">{user.firstName[0].toUpperCase()}</div>
            <div className="pt-2 text-sm">{user.firstName} {user.lastName}</div>
        </div>
        <div>
            <Button onClick={setModal} label={'Send Money'}></Button>
        </div>
        {modalOpen && <Modal setModalOpen={setModalOpen} userId={user._id} username={user.firstName} setBalance={setBalance}/>}
    </div>
}