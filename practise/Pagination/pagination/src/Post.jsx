import React, { useEffect, useState } from 'react'
const Card = ({ image, title }) => {
    return (
      <li className=" p-[40px] w-[400px] list-none border-1 m-1.5 rounded-2xl ">
        <img
          src={image}
          alt={title}
          className="size-[200px] object-cover rounded-lg ml-[50px] bg-amber-200 hover:scale-130 transition-transform duration-1000 hover:bg-amber-300 hover:brightness-110 hover:rotate-12"
        />
        <h1 className="text-lg font-semibold text-orange-800 justify-self-center pt-7">{title}</h1>
      </li>
    );
  };
  


  const Post = () => {
    const [arr, setArr] = useState([]);
    const [page, setPage] = useState(0);
  
    const total = Math.ceil(arr.length / 9);
    const start = page * 9;
    const end = start + 9;
  
    useEffect(() => {
      const fetchdata = async () => {
        const data = await fetch("https://dummyjson.com/products?limit=100");
        const narr = await data.json();
        setArr(narr.products);
        console.log(narr.products);
      };
      fetchdata();
    }, []);
  const forward=()=>{
    if(page+1<=total)
    {
        setPage((page)=>page+1);
    }
    else return;
    
  }
  const backward =()=>{
    if(page-1>=0)
    setPage((page)=>page-1)
else return ;
  }
    return (
      <>
        <div className="flex justify-center p-1">
        <button className='  size-[50px] rounded-full text-4xl my-2 hover:cursor-pointer hover:scale-125 transition-transform  disabled:scale-0' onClick={backward} disabled ={page==0}>
          ⬅️
        </button>
          {[...Array(total)].map((_, index) => (
            <h1
              key={index}
              className={`border-1 p-4 m-1 rounded-[5px] transition-transform cursor-pointer 
                ${
                  index === page
                    ? "bg-amber-300 text-white font-bold"
                    : "bg-gray-100 hover:bg-amber-200"
                }`}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </h1>
            
          ))}
           <button className='  size-[50px] rounded-full text-4xl my-2 hover:cursor-pointer hover:scale-125 transition-transform disabled:scale-0' onClick={forward} disabled={page==total-1}>
          ➡️
        </button>
        </div>
        {/* <h1 className='bg-am'>←</h1> */}
        
        <div className="flex flex-wrap justify-around">
          
          {arr.slice(start, end).map((ele, i) => (
            <Card key={ele.id} image={ele.thumbnail} title={ele.title} />
          ))}
        </div>
      </>
    );
  };
  
  export default Post;