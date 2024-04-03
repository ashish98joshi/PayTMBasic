import { Button } from './Button'
export const Searchbar = ({users}) => {
    return <div className="flex flex-col m-8 text-lg ">
        <div className="font-semibold">Users</div>
        <div className="">
            <input type="text" placeholder="Search users..." className="w-full focus:outline-black caret-slate-300 p-2 mt-4 outline-black border font-light text-sm border-slate-300 rounded"></input>
        </div>
        <div className="flex justify-between">
            {users.map(user => {
                return <UserList user={user}/>
            })}
        </div>
    </div>
}

function UserList({user}) {
    return <div>
        <div className='flex gap-2'>
            <div className="bg-slate-300 rounded-full w-8 h-8 items-center pt-1 mb-2 mr-2">U</div>
        </div>
        <div className='h-full'>
            <Button label={'Send Money'}></Button>
        </div>
    </div>
}