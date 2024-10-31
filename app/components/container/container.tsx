import { serviceInfo } from "@/app/lib/interface";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
 
interface Props {
  mdxSource: MDXRemoteSerializeResult
}

export async function LitGrid(props: {_info: serviceInfo[]}){
    return(
        <div className="display: flex">
        <div className="m-auto display: flex grid-cols-* gap-4 my-6">
            {props._info?.map((info: serviceInfo, idx: number) => (
                <div key={idx} className="transform border w-96 h-64 rounded-sm border-primary animate-in hover:animate-bounce">
                    <Link href={info.destination}>
                    <div className="flex relative bg-slate-900 w-full h-full rounded-lg m-auto">
                        <div className={"after:blur-md after:absolute after:size-full after:z-[-2] after:top-[50%] after:left-[50%] after:transform after:translate-x-[-50%] after:translate-y-[-50%] after:p-6 after:bg-gradient-conic-spin from-primary via-yellow-600 to-primary after:saturate-200 after:animate-pulse"}>
                        </div>
                        <div className="flex flex-col p-6">
                            <h2 className="text-2xl text-primary my-4">{info.title}</h2>
                            <p>{info.description}</p>
                        </div>
                    </div>
                    </Link>
                </div>
            ))}
        </div>
        </div>
    )
}

export async function LitGridOpen(props: {array: any[]}){
    return(
        <div className="display: flex">
        <div className="m-auto display: flex grid-cols-* gap-4 my-6">
            {props.array?.map((text: string, idx: number) => (
                <div key={idx} className="transform border w-96 h-64 rounded-sm border-primary animate-in hover:animate-bounce">
                    <div className="flex relative bg-slate-900 w-full h-full rounded-lg m-auto">
                        <div className={"after:blur-md after:absolute after:size-full after:z-[-2] after:top-[50%] after:left-[50%] after:transform after:translate-x-[-50%] after:translate-y-[-50%] after:p-6 after:bg-gradient-conic-spin from-primary via-yellow-600 to-primary after:saturate-200 after:animate-pulse"}>
                        </div>
                        <div className="flex flex-col p-6">
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}

export async function LitContainer(props: {children?: React.ReactNode}){
    return(
        <div className="flex relative bg-slate-900 w-full h-full rounded-lg m-auto my-6">
            <div className={`${"after:blur-md after:absolute after:size-full after:z-[-2] after:top-[50%] after:left-[50%] after:transform after:translate-x-[-50%] after:translate-y-[-50%] after:p-6 after:bg-gradient-conic-spin from-primary via-primary to-primary after:saturate-200 after:animate-pulse"} ${"rgbGradient"}`}>
            </div>
            {props.children}
        </div>
    )
}

export async function LitImage(props: {children?: React.ReactNode}){
    return(
        <div className="flex relative bg-slate-900 w-full h-full rounded-lg m-auto my-6">
            <div className={`${"after:blur-md after:absolute after:size-full after:z-[-2] after:top-[50%] after:left-[50%] after:transform after:translate-x-[-50%] after:translate-y-[-50%] after:bg-gradient-conic-spin from-primary via-primary to-primary after:saturate-200 after:animate-pulse"} ${"rgbGradient"}`}>
            </div>
            {props.children}
        </div>
    )
}

export async function BlogCard(props: {children?: React.ReactNode, image: string, title: string, slug: string, description: string}){
    return(
        <div className="h-full w-[100%] m-auto flex flex-col border border-collapse rounded-lg hover:border-primary bg-cover">
            <Image src={props.image} height={200} width={200} alt={props.title} className="size-full rounded-t-md bg-cover overflow-hidden" />
            <div className="p-6 m-auto flex flex-col">
                <span className="text-xl text-primary line-clamp-2">{props.description}</span>
                <Button asChild className="m-auto my-4">
                    <Link href={`/blog/${props.slug}/`}>Read More</Link>
                </Button>
            </div>
        </div>
    )
}

export async function ReviewCard(props: {image: string, name: string, score: number, link: string, alt: string, price?: string}){
    return(
        <LitContainer>
            <div className="flex m-auto">
                <Image src={props.image} alt={props.alt} width={200} height={200} className="size-[50%] rounded-tl-lg rounded-bl-lg border-r-4 border-primary"/>
                <div className="flex flex-col mx-auto p-4">
                    <div className="flex justify-evenly w-full border-b-4 border-primary">
                        <h2 className="text-6xl">{props.name}</h2>
                    </div>
                    <div className="m-auto flex flex-col">
                        <span className="text-primary mb-16 text-6xl">{`${props.score}/10`}</span>
                        {props.price? <h2 className="text-4xl text-primary mb-3">{`$${props.price}`}</h2> : null}
                        <Button asChild>
                            <Link href={props.link} rel="nofollow">
                                Buy Here
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </LitContainer>
    )
}

export async function MDXComponent({ mdxSource }: Props){
    return <MDXRemote {...mdxSource} />
}