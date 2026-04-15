import React, { useRef, useState } from 'react'

const App = () => {
  const [arr,setArr]=useState(new Array(6).fill(''))
  const Ref=useRef([]);
  const handleChange=(e,idx)=>{
      const key=e.key;
      // console.log(e);
      if(key==='backspace'){
        const newArr=[...arr];
        newArr[idx]='';
        setArr(newArr);
        if(idx-1>=0){
          Ref.current[idx-1].focus();
        }
        return 
      }
      
      if(key==='ArrowLeft'){
        if(idx-1>=0)
        Ref.current[idx-1].focus();
      return;
      }
      if(key==='ArrowRight'){
        if(idx+1<arr.length){
          Ref.current[idx+1].focus();
          return ;
        }
      }
      if(key>='0' && key<='9'){
        const newArr=[...arr];
        newArr[idx]=key;
        setArr(newArr);
        if(idx+1<arr.length){
          Ref.current[idx+1].focus();
        }

        return ;
      }
  }
  return (
    <>
  
     <div className='container'>
     <h1>This is an otp application</h1>
    <div>
    
      {arr.map((val,idx)=>{
        return (
          <input type="text" 
          value={val}
            ref={(refs)=>Ref.current[idx]=refs}
            onKeyDown={(e)=>handleChange(e,idx)}
          />
        )
      })}
    </div>
    </div>
    </>
  )
}

export default App
