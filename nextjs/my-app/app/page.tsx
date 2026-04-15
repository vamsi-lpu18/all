import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { getSnippets } from './snippet/new/actions';
import Home from '@/components/ui/Home';

export const dynamic = "force-dynamic";

type Snippet = { id: number; title: string; content: string };

const Page = async () => {
  const snippets = await getSnippets();

  return (
    <div className="p-4 flex justify-between">
      <h1><Home /></h1>
      <div className='flex-1 mx-4'>
        <p className="text-lg font-semibold">Snippets</p>
        <div className='w-full max-w-full max-h-full overflow-y-auto bg-red-600 text border rounded-md p-4'>
        {snippets.map((snippet) => (
          <div key={snippet.id} className="border p-2 my-2 rounded w-full">
            <h2 className="font-bold">{snippet.title}</h2>
            <pre className="bg-gray-100 p-2 rounded mt-1 whitespace-pre-wrap break-words">{snippet.content}</pre>
            <Link href={`/snippet/${snippet.id}`}> <Button>View</Button> </Link>
            <Link href={`/snippet/${snippet.id}/edit`}> <Button className='ml-2'>Edit</Button> </Link>
            <Link href={`/snippet/${snippet.id}/delete`}> <Button className='ml-2'>Delete</Button> </Link>
          </div>
        ))}
        </div>
      </div>
      <Link href="/snippet/new"> <Button className='cursor-pointer'>Click New</Button></Link>
    </div>
  )
}

export default Page
