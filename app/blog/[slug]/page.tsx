import parse from 'html-react-parser';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import { ParallaxHero } from "@/app/components/images/image";
import 'highlight.js/styles/base16/pop.css'
import {PrismaClient} from "@/prisma/generated/client"
import MarkdownArea from '@/app/components/markdown/MarkdownArea';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { LitContainer, MDXComponent } from '@/app/components/container/container';
import { cache } from 'react'
import { getAllPosts } from '@/actions/actions';
import { NewsletterBottomAd } from '@/app/components/newsletter/newsletter';
import Link from 'next/link';
import { ReviewCard } from '@/app/components/container/container';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Ebay from '@/app/components/ads/ebay';

hljs.registerLanguage('typescript', typescript);

export const revalidate = 30
const prisma = new PrismaClient()

//caching post fetch so that the data is only retrieved once
const getPost = cache(fetchPosts)

const components = {ReviewCard}

//static params for load time
//export async function generateStaticParams() : Promise<any>{
//  const posts = await getAllPosts()
//  console.log(`posts are ${posts}`)
//  posts.map(({id}) => id)
//}

export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata>{
  const post = await getPost(params.slug)
  const keywords = post.keywords
  return{
    title: post.title,
    description: post.description,
    keywords: [...keywords],
    openGraph: {
      images: [
        {
          url: post.image
        }
      ]
    },
    twitter:{
      card: "summary_large_image"
    }
  }
}

export async function getInitialProps({params}: {params: {slug: string}}) {
  // MDX text - can be from a local file, database, anywhere
  const content = await prisma.post.findMany({where: {slug: params.slug}})
  const source = content[0].content
  const mdxSource = await serialize(source)
  return { props: { source: mdxSource } }
}

//fetch posts from mongodb
async function fetchPosts(slug: string){
  const posts = await prisma.post.findMany({where: {slug: slug}})
  return (posts[0])
}

export default async function Article({params, source}:{params: {slug: string}, source: any}){
    //const data: article = await getData(params.slug)
    const post = await getPost(params.slug)
    const content = await serialize(post.content)
    
    return(
      <div className='display: flex h-full flex-col overflow-hidden top-0'>
        <ParallaxHero image={post.image} height={50}/>
        <div className='p-1'>
        <ins className="epn-placement" data-config-id="fff03d0f6c02747cb0c58ea5"></ins>
          <div className="w-[100vw] content-center flex-auto p-10 prose-h1:text-primary">
          <h1 className="text-3xl font-extrabold text-center">{post.title}</h1>
            <div className="mt-24 prose m-[auto] prose-violet prose-xl dark:prose-invert prose-h2:text-primary prose-li:color-primary">
              {/*parse(post.content)*/}
              <MarkdownArea content={post.content}>
              </MarkdownArea>
            </div>
            <div className="flex m-auto my-6">
              {!post.previous? <span/> :
                <form action={async () =>{
                  'use server'
                  redirect(`/blog/${post.previous}`)
                }}>
                  <Button type='submit'>Previous</Button>
                </form>
              }
              {!post.next? <span/> :
                  <Button asChild className='m-auto'>
                    <Link href={`/blog/${post.next}`}>{`Read Next Post`}</Link>
                  </Button>
              }
            </div>
        </div>

        <Ebay search={post.ebaySearch} image={post.ebayImage} productName={post.ebayProduct}/>
        <div className='my-6'>
          <LitContainer>
            <NewsletterBottomAd offer="Free SEO Checklist"/>
          </LitContainer>
        </div>
        </div>
      </div>
    )
}