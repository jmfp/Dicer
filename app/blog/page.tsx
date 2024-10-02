import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import parse from 'html-react-parser';
import { getAllPosts } from "@/actions/actions";
import { BlogCard, LitContainer } from "../components/container/container";

export const revalidate = 30

//design interface for post return
export interface post{
  title: string,
  image: string,
  slug: string,
  description: string,
  content: string
}

export default async function Home() {
  //const posts = await fetchPosts()
  const posts = (await getAllPosts()).reverse();
  //const test = await newView()

  return (
      <div className='display: flex w-[100%] justify-center mb-14'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-5 gap-5 content-center'>
          {posts.length ? posts.map((post: post, idx: number) =>(
            <BlogCard image={post.image} title={post.title} slug={post.slug} description={post.description} key={idx}/>
          )) : <span/>}
        </div>
      </div>
  );
}
