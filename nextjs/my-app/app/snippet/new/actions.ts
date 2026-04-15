"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// export async function saveSnippet(prevState: {message: string}, formData: FormData) {
//   const title = formData.get("title") as string;
//   const content = formData.get("content") as string;
//   try {
//     if(typeof title !== "string" || typeof content !== "string"){
//         // throw new Error("Invalid form data");
//         return {message: "Invalid form data"};
//     }
//   await prisma.snippet.create({
//     data: { title, content },
//   });
//   console.log("Snippet saved:", { title, content });
//   throw new Error("Intentional error for testing");
//   } catch (error:any) {
//         return {message: error.message};
//   }
    

//   redirect("/");
// }
export async function saveSnippet(prevState: {message: string}, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  try {
    if (!title || !content) {
      return { message: "Invalid form data" };
    }
    await prisma.snippet.create({
      data: { title, content },
    });
  } catch (error: any) {
    return { message: error.message };
  }
  revalidatePath("/");

  redirect("/");
}
export async function getSnippets() {
    const res = await prisma.snippet.findMany();
    return res;
}
export async function DeleteSnippet(id: number) {
    const existing = await prisma.snippet.findUnique({ where: { id } });
    if (existing) {
        await prisma.snippet.delete({
            where: {
                id: id
            }
        })
    }
    revalidatePath("/");
    redirect("/");
}
export async function EditSnippet(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const id= formData.get("id") as string;
    await prisma.snippet.update({
        where: {
            id: parseInt(id)
        },  
        data: { title, content }
    })

    redirect("/");
}
export async function getSnippetById(id: number) {
    const data=prisma.snippet.findUnique({
        where:{
            id: id
        }
    })
    return data;
}
