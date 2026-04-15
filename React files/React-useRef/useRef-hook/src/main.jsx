import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import Useref from './Useref.jsx'
import Stopwatch from './Stopwatch.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Useref/> */}
    <Stopwatch/>
  </StrictMode>
)
