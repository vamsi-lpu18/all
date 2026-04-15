import { useEffect, useState } from 'react'
// import Use from './assets/Use'
import { Routes ,Route, Link} from "react-router";
import Home from "./Home"
import About from './About';
import Living from './Living';
import Name from './Name';

function App() {
 

  return (
    <>
<Link style={{textDecoration:"none"}}to='/'>Home</Link>
<br></br>
<Link style={{textDecoration:"none"}} to='/About'>About</Link>

<Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/About' element={<About/>}>
    <Route path='Name' element={<Name/>}/>
    <Route path='Living' element={<Living/>}/>
      </Route>
</Routes>
</>
  )
}

export default App;
