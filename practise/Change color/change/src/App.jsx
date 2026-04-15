import React, { useState } from 'react'

const App = () => {
  const [color,setColor]=useState('white');
  return (
    <div className={`border size-[50vh] m-auto mt-[30vh] bg-white flex  items-baseline-last justify-center rounded`} style={{backgroundColor:color}}>
      {/* <h1>Change color</h1>
      input */}
      <input type="text" value={color} onChange={(e)=>setColor(e.target.value)} placeholder='Enter color for the grid' className='bg-white outline-none border text-2xl p-3'/>
      
    </div>
  )
}

export default App
