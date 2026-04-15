import React from 'react'

const Card = ({title,thumbnail}) => {
  return (
    <div className='border-0 bg-amber-200  m-4 rounded-b-xl hover:scale-110 transition cursor-pointer'>
      {/* {title} {description} */}
      <img src ={thumbnail} width="300px"/>
      <h1 className='text-center font-serif text-xl text-white bg-black rounded-l-xl p-2.5 '>{title}</h1>
      {/* <h1>{description}</h1> */}
    </div>
  )
}

export default Card
