import React, { useEffect, useState } from 'react'
import json from './data.json'
import FileExp from './FileExp';
const App = () => {
  const [data,setData]=useState([]);
  useEffect(()=>{
    setData(json); 
  },[])
  return (
    <div>
    
      <FileExp data={data}/>
    </div>
  )
}

export default App
