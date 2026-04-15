import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Home from './Home.jsx'
import { BrowserRouter } from 'react-router-dom'
import Routers from './Routers.jsx'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routers/> 
        <ToastContainer position="top-right" autoClose={5000} />

    </BrowserRouter>
   
 
)
