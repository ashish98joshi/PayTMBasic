import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'

function App() {
  return <>
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Signup/> }></Route>
            {/* <Route path='/signin' element={<Signin/> }></Route>
            <Route path='/dashboard' element={<Dashbaord/> }></Route>
            <Route path='/send' element={<SendMoney/> }></Route> */}
            
        </Routes>
    </BrowserRouter>
  </>
}

export default App
