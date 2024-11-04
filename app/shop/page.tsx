import { getCategories } from "@/actions/actions"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { LitContainer } from "../components/container/container";
import { redirect } from "next/navigation";

export default async function Shop() {
    const images:any = {
        "PS2": "/images/PS2.webp",
        "DC": "/images/Dreamcast.svg",
        "SFC": "/images/SNES.png",
        "GCN": "/images/GameCube.svg",
        "PSX, PSOne, PS": "/images/Playstation.png",
        "PSP": "/images/PSP.svg",
        "GB": "/images/GameBoy.png",
        "GBC": "/images/GBC.png",
        "GBA": "/images/GBA.png",
        "Sega Genesis": "/images/Genesis.png",
        "NES": "/images/NES.png",
        "N64": "/images/n64.png",
        "NGP": "/images/NeoGeoPocket.png",
        "NGPC": "/images/NeoGeoPocketColor.png",
        "VB": "/images/VirtualBoy.png",
        "GG": "/images/GameGear.webp",
        "Mega CD": "/images/SegaCD.png",
        "NDS": "/images/NintendoDS.png",
        "WII": "/images/Wii.png",
        "NGAGE": "/images/Ngage.png",
        "WS": "/images/WonderSwan.svg",
        "WSC": "/images/WonderSwanColor.png",
        "JVC Saturn, Hi-Saturn, Samsung Saturn, V-Saturn": "/images/SegaSaturn.png",

    }

    const fetchData = async () =>{
        const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_DEV_CLIENT_ID}&client_secret=${process.env.TWITCH_DEV_SECRET}&grant_type=client_credentials`)
        return response.data.access_token
    }
    const getPlatform = async (token: string) =>{
        const platform = await fetch(
            "https://api.igdb.com/v4/platforms",
            { method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Client-ID': `${process.env.TWITCH_DEV_CLIENT_ID}`,
                'Authorization': `Bearer ${token}`,
              },
              body: `fields *; where alternative_name = ("PS2", "DC", "NES", "N64", "SFC", "GCN", "PSX, PSOne, PS", "NGPC", "NGP", "VB", "GG", "Mega CD", 
              "NDS", "PSP", "WII", "GBA", "NGAGE", "WS", "WSC", "JVC Saturn, Hi-Saturn, Samsung Saturn, V-Saturn", "Sega Genesis", "GBC", "GB"); limit 100; sort platform_family;`
          })
          return platform.json()
    }

    const getPlatformLogo = async (token: string, id: any) =>{
        const platform = await fetch(
            "https://api.igdb.com/v4/platform_logos",
            { method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Client-ID': `${process.env.TWITCH_DEV_CLIENT_ID}`,
                'Authorization': `Bearer ${token}`,
              },
              body: `fields *; where id = (${id});`
          })
        return platform.json()
    }

    const token = await fetchData()
    const plats = await getPlatform(token)
  return (
    <div>
        <form action={async (formdata: FormData) =>{
            'use server'
            redirect(`/search/${formdata.get("search")}`)
        }} className="flex flex-col m-auto">
            <Input name="search" className="caret-primary w-[90%] m-auto mt-6" placeholder="Search for games"/>
            <Button type="submit" className="w-[80%] m-auto my-6 ">
                Search
            </Button>
        </form>
        <div className="grid p-6 my-5 mx-5 gap-5 content-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {!plats? null : 
                plats.map(async(plat: any, idx: number) =>{
                    const img = images[plat.alternative_name]
                    return(
                        <Link key={idx} href={`/shop/${plat.name.replace(/\//g, "")}/${0}/${plat.id}`}>
                            <LitContainer>
                                <div className="flex justify-items-center m-auto w-[300px] h-[300px]">
                                    <Image src={img} width={200} height={200} alt={plat.name} className="m-auto"/>
                                </div>
                            </LitContainer>
                        </Link>
                    )
                })
            }
        </div>
    </div>
  )
}
