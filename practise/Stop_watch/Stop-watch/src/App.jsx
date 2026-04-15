import React, { useEffect, useState } from 'react'

const App = () => {
const [time,setTime]=useState(0);
const [run,setRun]=useState(false)
    // let ;
    const sec=Math.floor(time%60)
    const min=Math.floor(time/60)%60
    const h=Math.floor(time/(60*60))
  const handleStop=()=>{
    // clearInterval();
    setRun(false)
  }
  const handleStart=()=>{
    if(run)
      return;
    setRun(true);
  }
  const handleReset=()=>{
    setRun(false);
    setTime(0);
  }
  useEffect(()=>{
    let timer ;
    if(run){
    timer=setInterval(()=>{
      setTime(prev=>prev+1)
    },1000)
  }
    return ()=>clearInterval(timer)
  },[run,time])

  
  return (
    <>

    <div className='border bg-gray-600  size-[500px] m-auto mt-[15vh] flex justify-center items-center flex-col rounded-[300px]'>
               <span className=' text-center text-6xl text-white'>{h<9?'0'+h:h}:{min<9?'0'+min:min}:{sec<9?'0'+sec:sec}</span>
      <div className='flex items-center justify-center '>
      <button className='bg-blue-500 p-2.5 m-2 text-white rounded cursor-pointer hover:bg-blue-700 hover:scale-110 outline-none hover:animate-pin   ' onClick={handleStart}>Start</button>
      <button className='bg-red-500 p-2.5 m-2 text-white rounded hover:bg-red-700 hover:scale-110 cursor-pointer outline-none' onClick={handleStop}>Stop</button>
      <button className='bg-yellow-500 p-2.5 m-2 text-white rounded  hover:bg-yellow-700 hover:scale-110 cursor-pointer outline-none' onClick={handleReset}>Reset</button>
      </div>

      
    </div>
    </>
  )
}

export default App
