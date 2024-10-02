import { serviceInfo } from "@/app/lib/interface";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
        <div className="flex relative bg-slate-900 w-full h-full rounded-lg m-auto">
            <div className={`${"after:blur-md after:absolute after:size-full after:z-[-2] after:top-[50%] after:left-[50%] after:transform after:translate-x-[-50%] after:translate-y-[-50%] after:p-6 after:bg-gradient-conic-spin from-primary via-green-600 to-primary after:saturate-200 after:animate-pulse"} ${"rgbGradient"}`}>
            </div>
            {props.children}
        </div>
    )
}

export async function BlogCard(props: {children?: React.ReactNode, image: string, title: string, slug: string, description: string}){
    return(
        <div className="size-full m-auto flex flex-col border border-collapse rounded-lg hover:border-primary">
            <Image src={props.image} height={100} width={100} alt={props.title} className="size-full rounded-t-md" />
            <div className="p-6 m-auto">
                <span className="text-xl text-primary line-clamp-2">{props.description}</span>
                <Button asChild>
                    <Link href={`/blog/${props.slug}/`}>Read More</Link>
                </Button>
            </div>
        </div>
    )
}