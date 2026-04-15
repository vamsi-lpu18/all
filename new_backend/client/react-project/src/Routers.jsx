import React from 'react'
import { BrowserRouter , Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'

const Routers = () => {
  return (
    <div>
    {/* <Link to='/'></Link> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default Routers
