import { prisma } from '@/lib/prisma'
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const data = await prisma.snippet.findUnique({
        where: {
            id: parseInt(id)
        }
    })  
  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>
    </div>
  )
}

export default page
export const generateStaticParams = async () => {
    const snippets = await prisma.snippet.findMany();
    return snippets.map((snippet) => ({ id: snippet.id.toString() }));
}
