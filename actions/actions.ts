'use server'

import { course } from "@/app/lib/interface"
import { PrismaClient } from "@/prisma/generated/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

//convert file to base64
const toBase64 = async (file: File) => {
    const bufferFile = await file.arrayBuffer()
    const fileBase64 = Buffer.from(bufferFile).toString('base64')
    const finalString = `data:${file.type};base64,${fileBase64}`
    return finalString
  };

export async function validateUser(user: any){
    try {
        const res = await prisma.user.findUnique({where:{email:user.email}})
        if (res && user.password === res.password){
            console.log(res)
            return (true)
        }
    } catch (error: any) {
        console.log(error.message)
    }
    return false
}

export const addBlog = async (formData: any) => {
    const title = formData["title"]
    const image = formData["image"]
    const slug = formData["slug"]
    const description = formData["description"]
    const content = formData["content"]
    const category = formData["category"]
    const new_blog = await prisma.post.create({
        data:{
            image: image,
            title: title,
            slug: slug,
            description: description,
            content: content, 
            category: category
        }
    })

    //revalidate cache for server action
    revalidatePath('/admin/posts/new')
    redirect('/')
}

export const deleteBlog = async(slug: any) =>{
    prisma.post.delete({where: {slug: slug}})
}

export const getAllPosts = async() => {
    revalidatePath('/admin/dashboard')
    return await prisma.post.findMany({})
}