import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { EditSnippet, getSnippetById } from '../../new/actions'

const Edit =async ({params}:{params:Promise<{id:string}>}) => {
  const { id } = await params;
  const data=await getSnippetById(parseInt(id))
  return (
    <div>
      <form action={EditSnippet} className='flex flex-col'>
        <input type="hidden" name="id" value={id} />
        <Label>Edit Snippet </Label>
        <br></br>
        <Input placeholder='Enter Title' name="title" className='border border-black rounded-md' defaultValue={data?.title}></Input>
        <br></br>
        <br></br>
       <textarea id="content" name="content" className='w-full h-40 p-2 border border-black rounded-md' placeholder='Enter your code snippet here...' defaultValue={data?.content}    ></textarea>
       <Button type="submit" className='cursor-pointer'>Save</Button>
      </form>
    </div>
  )
}

export default Edit
