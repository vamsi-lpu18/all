import { useCallback, useState } from "react"
import Child from "./Child";

export default function Usecall(){
    const [count,setCount]=useState(0);
    const [value,setValue]=useState(0);
    // useCallback( print,[])
    const print = useCallback(()=>{
        console.log("im parent")
    },[count])
return (
    <>
    <Child count={count} print={print}/>
    <h1>
        count:{count}
        <br></br>
        value:{value}
    </h1>
    <button onClick={()=>setCount(count+1)}>increase</button>
    <button onClick={()=>setValue(value+1)}>val increase</button>

    </>
)
}