import React from 'react'
import { Button } from './components/ui/button'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex bg-gray-400 justify-around p-4'>
      <h1 className=''>home</h1>
      <Button>
      <Link to='/login'>Logout</Link>
      </Button>
      <Button>
      <Link to='/register'>Register</Link>
      </Button>

    </div>
  )
}

export default Navbar
