import axios from "axios"
import { Button } from "../components/Button"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { Subheader } from "../components/Subheader"
import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"

export const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className='flex justify-center h-screen bg-slate-300'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-md h-fit w-80 bg-white text-center p-3'>
                <Header label={'Sign up'}> </Header>
                <Subheader label={'Enter your information to create an account'}></Subheader>
                <Input onChange={(e) => setFirstName(e.target.value)} placeholder='John' label={'First Name'}></Input>
                <Input onChange={(e) => setLastName(e.target.value)} placeholder='Doe' label={'Last Name'}></Input>
                <Input onChange={(e) => setUsername(e.target.value)} placeholder='abcd@gmail.com' label={'Email'}></Input>
                <Input onChange={(e) => setPassword(e.target.value)} placeholder='123456' label={'Password'} isPassword ></Input>
                <Button label={'Sign up'} onClick={async () => {
                    const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                        userName: username,
                        firstName: firstName,
                        lastName: lastName,
                        password: password
                    })
                    localStorage.setItem('token', response.data.token)
                    console.log(response)
                    navigate('/dashboard');
                }}></Button>
                <Footer label={'Already have an account?'} buttonText={'Sign in'} to={"/signin"}></Footer>
            </div>
        </div>
    </div>
}