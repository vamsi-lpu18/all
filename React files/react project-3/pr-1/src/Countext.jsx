import { createContext, useContext, useState } from "react"
import C1 from "./C1";
// const UserContext=createContext();
const Theme=createContext();
const Countext =() =>{
    const [name,setName]=useState("");
    // const UserContext=createContext();

    return (
        <>
        {/* <UserContext.Provider value={{name}}> */}
        <Theme.Provider value={{name,setName}}>
        <C1/>
        </Theme.Provider>
        <h1>I'm  from parent {name}</h1>
        {/* </UserContext.Provider> */}
        </>
    )
}
export default Countext;
// export {UserContext}
export {Theme}