import { Button } from "../components/Button"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { Subheader } from "../components/Subheader"

export const Signup = () => {
    return <div className='flex justify-center h-screen bg-slate-300'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-md h-fit w-80 bg-white text-center p-3'>
                <Header label={'Sign up'}> </Header>
                <Subheader label={'Enter your information to create an account'}></Subheader>
                <Input placeholder='John' label={'First Name'}></Input>
                <Input placeholder='Doe' label={'Last Name'}></Input>
                <Input placeholder='abcd@gmail.com' label={'Email'}></Input>
                <Input placeholder='123456' label={'Password'} isPassword ></Input>
                <Button label={'Sign up'}></Button>
                <Footer label={'Already have an account?'} buttonText={'Sign in'} to={"/signin"}></Footer>
            </div>
        </div>
    </div>
}