import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { Subheader } from "../components/Subheader"
import { useState } from "react"
import axios from "axios"

export const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className="h-screen bg-slate-300 flex justify-center">  
        <div className="flex flex-col justify-center">
            <div className="rounded-md w-80 bg-white text-center p-3">
                <Header label={'Sign in'}></Header>
                <Subheader label={'Enter your credentials to access your account'}></Subheader>
                <Input onChange={(e) => setUsername(e.target.value)} label={'Email'} placeholder='john@gamil.com'></Input>
                <Input onChange={(e) => setPassword(e.target.value)} label={'Password'} placeholder='123456' isPassword></Input>
                <Button label={'Sign in'} onClick={async (e) => {
                    const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                        userName: username,
                        password: password
                    })
                    console.log(response);
                    if (response.status == 200) {
                        localStorage.setItem('token', response.data.token)
                        navigate('/dashboard');
                    } else {
                        alert('Error occured');
                    }
                }}></Button>
                <Footer label={'Dont have an account?'} buttonText={'Sign up'} to={'/signup'}></Footer>
            </div>
        </div>
    </div>
}