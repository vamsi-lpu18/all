import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1>Home page</h1>
      <Button className='cursor-pointer'>Sign in </Button>
      <Button className='cursor-pointer'>Sign out </Button>

    </div>
  )
}

export default page
