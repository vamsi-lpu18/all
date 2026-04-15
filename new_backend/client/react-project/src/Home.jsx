import React from 'react'
import Navbar from './Navbar'
import App from './App'

const Home = () => {
  return (
    <div>
    <div className='sticky top-0 z-50 bg-gray-800'>
      <Navbar/>
      </div>
      <App/>
    </div>
  )
}

export default Home
