import React, { useEffect, useState } from 'react'
import Card from './Card';

const App = () => {
  const [data,setData]=useState([]);
  const [page,setPage]=useState(1);
  const fetchdata=async()=>{
    let data=await fetch('https://dummyjson.com/products');
    let res=await data.json();
    console.log(res.products)
    setData(res.products);
  }
  const handlePrev=()=>{
    setPage(prev=>prev-1)
  }
  const handleNext=()=>{
    setPage(prev=>prev+1)
  }
  const arr=new Array(5).fill(0);
  useEffect(()=>{
    fetchdata()
  },[])
  return (
    <>
    <div className='flex flex-wrap justify-center '>
    {data.slice(page*5,page*5+5).map((ele,idx)=>(   
         <Card thumbnail={ele.thumbnail} title={ele.title} description={ele.description} key={idx}/>
    
    ))}
    </div>
    <span className='flex justify-center '>
    <button onClick={handlePrev} disabled={page==1} className={`cursor-pointer ${page==1?'blur-[3px]':''} scale-125`}>⬅️</button>
        {
      arr.map((_,idx)=>{
        return (
          <h1 className={`m-3 text-2xl font-bold cursor-pointer ${idx+1==page?'bg-amber-300 ':''}`} onClick={()=>setPage(idx+1)}>{idx+1}</h1>
        )
        })
    }
        <button onClick={handleNext}  disabled={page==6}className={`cursor-pointer ${page==5?'blur-[3px]':''} scale-125`}>➡️</button>

    </span>

    
    </>
  )

}

export default App
