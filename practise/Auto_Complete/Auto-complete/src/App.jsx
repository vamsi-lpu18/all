import React, { useEffect, useState } from 'react'

const App = () => {
  const [data,setData]=useState([]);
  const [val,setVal]=useState('');


const fetchData=async()=>{
 let res=await fetch('https://fakestoreapi.com/products');
    res=await res.json();
    console.log(res)
    setData(res);
  }

  useEffect(()=>{
    let timer=setTimeout(()=>{
          fetchData();
    console.log(val);

    },400)
    return ()=>{
      clearInterval(timer);
    }
  },[val])
  return (
    <>
    <div className=' m-auto bg-gray-300 flex justify-center w-[300px] mt-7 flex-col h'>
      <input type="text" placeholder='Enter product' className='outline-0 text-2xl' value={val} onChange={(e)=>setVal(e.target.value)} />
    
    <div className='bg-red-600 h-[80vh] overflow-y-scroll'>
       {val && val.length > 0 && data
  .filter((e) => e.title.toLowerCase().includes(val.toLowerCase()))
  .map((ele) => (
    <h1 
      key={ele.title} 
      className="cursor-pointer text-white  rounded m-4  hover:bg-red-900 p-3.5" 
      onClick={()=>setVal(ele.title)}
    >
      {ele.title}
    </h1>
  ))}

    </div>
    </div>
    </>

  )
}

export default App
