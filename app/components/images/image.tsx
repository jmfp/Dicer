
import { ReactNode } from "react";
import { RGBButton } from "../button/Button";

{/*export default function ParallaxImage(props: {image: string, alt:string, width:number, height:number, style:string, text:string}){
    return(
        <ParallaxBanner layers={[{ image: props.image, speed: -20 }]} className="aspect-[2/1] object-cover z-0 items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center m-[auto]">
                <h1 className="text-8xl text-white font-thin text-center">{props.text}</h1>
            </div>
        </ParallaxBanner>
    )
}*/}

export async function ParallaxHero(props:{image: string, height: number, text?: string, children?: ReactNode, style?: string}) {
    return(
        <div className={`h-full`}>
            <div
            className={`w-full bg-cover bg-center bg-fixed bg-no-repeat max-sm:scale-100`}
            style={{
              backgroundImage: `url(${props.image})`,
              paddingTop: `${props.height}%`
            }}
        >
            <div className='display: flex m-auto'>
                <p className="m-auto">{props.text}</p>
                <div className="m-auto">
                    {props.children}
                </div>
            </div>
        </div>
            
        </div>
    )
}

export async function ParallaxHeroShort(props:{image: string, height: number, text?: string, children?: ReactNode, style?: string}) {
    return(
        <div className={`h-full`}>
            <div
            className={`w-full bg-cover bg-center bg-fixed bg-no-repeat max-sm:scale-100`}
            style={{
              backgroundImage: `url(${props.image})`,
              paddingTop: `${props.height}%`
            }}
        >
            <div className='display: flex m-auto'>
                <p className="m-auto">{props.text}</p>
                <div className="m-auto">
                    {props.children}
                </div>
            </div>
        </div>
            
        </div>
    )
}

export async function ParallaxHeroContainer(props:{image: string, height: number, text?: string, children?: ReactNode, style?: string, buttonText?: string}) {
    
    return(
        <div className={`h-full`}>
            <div
            className={`w-full bg-cover bg-center bg-fixed bg-no-repeat max-sm:bg-contain`}
            style={{
              backgroundImage: `url(${props.image})`
            }}
        >
            <div className='display: flex m-auto h-full'>
                <p className="m-auto text-4xl">{props.text}</p>
                <div className="m-auto my-24">
                    {props.children}
                </div>
            </div>
        </div>
            
        </div>
    )
}