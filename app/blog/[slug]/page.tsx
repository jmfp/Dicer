import parse from 'html-react-parser';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import { ParallaxHero } from "@/app/components/images/image";
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import 'highlight.js/styles/base16/pop.css'
import {PrismaClient} from "@/prisma/generated/client"
import MarkdownArea from '@/app/components/markdown/MarkdownArea';

hljs.registerLanguage('typescript', typescript);

export const revalidate = 30
const prisma = new PrismaClient()

//fetch posts from mongodb
async function fetchPosts(slug: string){
  //const res = await fetch(`${process.env.API_URL}/api/posts?slug=${slug}`)
  //const posts = await res.json()
  const posts = await prisma.post.findMany({where: {slug: slug}})
  return (posts[0])
}

//useEffect(() => {
//  hljs.initHighlighting();
//}, []);

export default async function Article({params}:{params: {slug: string}}){
    //const data: article = await getData(params.slug)
    const post = await fetchPosts(params.slug)
    let content = parse(post.content)
    return(
      <div className='display: flex h-full flex-col'>
        <ParallaxHero image={post.image} height={"50"}/>
        {/*<ParallaxImage 
          image={post.image}
          alt={post.slug}
          width={1920}
          height={500}
          style="w-[100%] h-[600px] rounded-lg m-[auto] object-cover border-4 border-violet-600"
          text=''
        />*/}
          <div className="w-[100vw] content-center flex-auto p-10 prose-h1:text-violet-500">
          <h1 className="text-3xl font-extrabold text-center">{post.title}</h1>
            <div className="mt-24 prose m-[auto] prose-violet prose-xl dark:prose-invert prose-h2:text-violet-500 prose-li:color-violet-500">
              {/*parse(post.content)*/}
              <MarkdownArea content={post.content}>
              </MarkdownArea>
            </div>
            
        </div>
      </div>
    )
}