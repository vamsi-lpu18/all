import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {BrowserRouter} from 'react-router'
import App from './App'
// import About from './About'
import Data from './Data'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <App /> */}
    {/* <App /> */}
    {/* <App/> */}
    {/* <About/> */}
    <Data/>
    
  </BrowserRouter>
)
