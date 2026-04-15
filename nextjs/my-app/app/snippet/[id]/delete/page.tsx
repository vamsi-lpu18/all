import React from 'react'
import { DeleteSnippet } from '../../new/actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Delete = async ({params}: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const deleteAction = async () => {
        "use server";
        await DeleteSnippet(parseInt(id));
    };
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Are you sure you want to delete this snippet?</h1>
            <div className="mt-4 flex gap-2">
                <form action={deleteAction}>
                    <Button type="submit">Yes, Delete</Button>
                </form>
                <Link href={`/snippet/${id}`}><Button>Cancel</Button></Link>
            </div>
        </div>
    )
}

export default Delete
