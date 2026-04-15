import { useRef, useState } from "react"

export default function Stopwatch(){
    const [count,setCount]=useState(0)
    const time=useRef(0);
    const start =() =>{
        if(time.current)
            return
       time.current= setInterval( ()=>{
        // time.current=time.current+1;

        setCount((count)=>count+1);
        },1000)
        console.log(time.current)
    }
    const stopped =() =>{
        clearInterval(time.current);
        time.current=null;
    }
    const reset = ()=>{
        stopped();
        setCount(0);
    }

    return (
        <>
        <div style={{border:"2px"}}>
            <center>
            <h1 style={{color:"blue"}}>Timer : {count}</h1>
            <button onClick={start} style={{background:"green"}}>Start</button><span></span>
            <button onClick={stopped} style={{background:"red"}}>Stop</button><span></span>
            <button onClick={reset} style={{background:"yellow"}}>Reset</button>
            </center>
        </div>
        </>
    )
}