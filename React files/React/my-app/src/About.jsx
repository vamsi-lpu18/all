import { Routes ,Route, NavLink, Outlet} from "react-router";
import Home from "./Home"
import './App.css'


const About =()=>{
    return (
<>
<h1>This is About</h1>
<center>
    <h1>To visit Details</h1>
<NavLink style={{textDecoration:"none"}} to='Name'>Name</NavLink>
<br></br>
<NavLink style={{textDecoration:"none"}} to='Living'>Living</NavLink>
<Outlet/>
{/* <NavLink style={{textDecoration:"none"}} to='/About'>About</NavLink> */}
</center>
</>
    )
}
export default About;