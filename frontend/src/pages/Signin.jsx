import { Button } from "../components/Button"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { Subheader } from "../components/Subheader"

export const Signin = () => {
    return <div className="h-screen bg-slate-300 flex justify-center">  
        <div className="flex flex-col justify-center">
            <div className="rounded-md w-80 bg-white text-center p-3">
                <Header label={'Sign in'}></Header>
                <Subheader label={'Enter your credentials to access your account'}></Subheader>
                <Input label={'Email'} placeholder='john@gamil.com'></Input>
                <Input label={'Password'} placeholder='123456' isPassword></Input>
                <Button label={'Sign in'}></Button>
                <Footer label={'Dont have an account?'} buttonText={'Sign up'} to={'/signup'}></Footer>
            </div>
        </div>
    </div>
}