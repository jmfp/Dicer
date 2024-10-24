'use server'

//import { course } from "@/app/lib/interface"
import { PrismaClient } from "@/prisma/generated/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import fs from 'fs';

const prisma = new PrismaClient()

const client = require("@mailchimp/mailchimp_marketing");
client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export async function handle(email: any, name: any){
    const response = await client.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, { email_address: email, status: "subscribed", merge_fields:{FNAME: name, LNAME: ""} })
    //const response = await client.lists.setListMember(
    //    process.env.MAILCHIMP_AUDIENCE_ID,
    //    "subscriber_hash",
    //    { email_address: email, status_if_new: "pending" }
    //  );
    //  console.log(response);
  //const body = req.body;
  //const bodyJson = JSON.parse(body)
  console.log(response)
}


//convert file to base64
const toBase64 = async (file: File) => {
    const bufferFile = await file.arrayBuffer()
    const fileBase64 = Buffer.from(bufferFile).toString('base64')
    const finalString = `data:${file.type};base64,${fileBase64}`
    return finalString
  };

const toBase64FromPath = async (file: any) =>{
    const fileData = fs.readFileSync(file)
    const base64String = fileData.toString('base64');
    
    return JSON.stringify({ base64: base64String });
}

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
    const title = formData.get("title")
    const image = formData.get("image")
    const slug = formData.get("slug")
    const description = formData.get("description")
    const content = formData.get("content")
    const category = formData.get("category")
    const keywords = formData.get("keywords")
    const keywordList = keywords.split(",")
    //const img_file = await toBase64FromPath(image)
    const new_blog = await prisma.post.create({
        data:{
            image: await toBase64(image),
            title: title,
            slug: slug,
            description: description,
            content: content, 
            category: category,
            keywords: keywordList
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