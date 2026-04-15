"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useActionState } from 'react'
import { saveSnippet } from './actions'



const page =  () => {
  const[formStateData,xyz]=useActionState(saveSnippet,{message:""});
  console.log(formStateData);
  return (
    <div>
      <h1 className='text-2xl text-green-600'>New Snippet</h1>
      <br></br>
      <form action={xyz} className='flex flex-col'>
        <Label htmlFor="content">Code Snippet</Label><br></br>
        <textarea id="content" name="content" className='w-full h-40 p-2 border border-black rounded-md' placeholder='Enter your code snippet here...'></textarea>
        <Input type="text" name="title" placeholder="Snippet Title" className='mt-4 border border-black rounded-md' />
        {formStateData?.message && <p className='text-red-500'>{formStateData.message}</p>}
        <Button type="submit" className='mt-4 cursor-pointer'>Save Snippet</Button>
      </form>
    </div>
  )
}

export default page
