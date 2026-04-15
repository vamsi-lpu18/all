import { useRef, useState } from "react";


function App() {

  // console.log(arr);
  const [arr,setArr]=useState(new Array(6).fill(""));
      const ref=useRef([]);
  const handlekey =(ele,i)=>{
      const key=ele.key;
     
      console.log(ele);
      const narr=[...arr];
      
      if(key==='Backspace')
      {
        const narr=[...arr];
        narr[i]='';
        setArr(narr);
        if(i-1>=0)
        {
          ref.current[i-1].focus();
        }
      }
      if(key=='ArrowRight')
      {
        if(i+1<arr.length)
        {
          ref.current[i+1].focus();
        }
      }
      if(key=='ArrowLeft')
        {
          if(i-1>=0)
          {
            ref.current[i-1].focus();
          }
        }
      if(key>='0' && key<='9')
      {
        narr[i]=key;
      setArr(narr)
      if(i+1<arr.length)
      ref.current[i+1].focus();
      }
      
      
  }
  return (
    <><h1 className="flex justify-center text-6xl mb-[50px] font-serif text-red-400">OTP Application</h1>
      <div className="flex justify-center items-center">
        
        {
          arr.map((ele,i)=>{
            return (
              <input
              key={i}
              type="text"
              value={ele}
              ref={(cinput) => (ref.current[i] = cinput)} 
              onKeyDown={(e) => handlekey(e, i)}
              className="border-[1px] w-[70px] h-[70px] m-2 text-center rounded-[10px]  tranition duration-800 focus:scale-115 bg-amber-200 text-2xl"
            />
            )
          })
        }
        </div>
      
    </>
  )
}

export default App
