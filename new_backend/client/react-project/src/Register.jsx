import React, {  useState } from 'react'
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email,setEmail]=useState('');
     const [password,setPassword]=useState('');
     const navigate=useNavigate();
     const handleLogin=async()=>{
         try {
             const res=await fetch("http://localhost:3000/api/user/login",{
                 method:"POST",
                 headers:{
                     "Content-Type":"application/json"
                 },      
                 body:JSON.stringify({email,password})
             });
             if(res.ok){
                     toast.success("Login successful");
                     navigate('/');
 
             }
             else{
                 toast.error("Login failed");
             }   
         } catch (error) {
             toast.error("An error occurred during login");
             console.log("Error during login:",error);
         }
     }
   return (
     <div>
     <center>
       <Input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-5/17 align-super text-white mt-3" />
       <br/>
       <Input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-5/17 align-super text-white mt-3" />  
       <br/>
       <Button  className="cursor-pointer mt-4" onClick={handleLogin}>Login</Button> </center>  
     </div>
   )
}

export default Register
