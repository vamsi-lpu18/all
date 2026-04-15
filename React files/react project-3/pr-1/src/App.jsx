import { useEffect, useState } from "react"


function App() {
  let [count,setCount]=useState(0);
  // function handle()
  // {
  //   setCount(count+1);
  // }
  useEffect(()=>{
    alert("Im called only when it is called");
    return ()=>{
      console.log("Unmounted");
    }
  },[count])
  return (
    <>
     <h1> Count is : {count}</h1>
      <button onClick={()=>{setCount(count+1)}}>Click me </button>
    </>
  )
}

export default App
