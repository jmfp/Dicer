import { LitContainer, LitImage } from "@/app/components/container/container"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
//import apicalypse from 'apicalypse';

export default async function ShopCategory({params}:{params: {category: string, offset: string, platform: string}}) {

    const searchData = {
        fields: "*", 
        search: `${params.category}`
    }
    const fetchData = async () =>{
        const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_DEV_CLIENT_ID}&client_secret=${process.env.TWITCH_DEV_SECRET}&grant_type=client_credentials`)
        return response.data.access_token
    }

    const getPlatform = async (token: string, name: any) =>{
        const platform = await fetch(
            "https://api.igdb.com/v4/platforms",
            { method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Client-ID': `${process.env.TWITCH_DEV_CLIENT_ID}`,
                'Authorization': `Bearer ${token}`,
              },
              body: `fields *; where name = "${decodeURIComponent(params.category)}";`
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

    const fetchGames = async (token: string, platform: number) =>{
        const games = await fetch(
            "https://api.igdb.com/v4/games",
            { method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Client-ID': `${process.env.TWITCH_DEV_CLIENT_ID}`,
                'Authorization': `Bearer ${token}`,
              },
              body: `fields *; where release_dates.platform = (${platform}); limit 21; offset ${params.offset}; sort name;`
          })
          return games.json()
    }

    const fetchCover = async(token: string, id: any) =>{
          const covers = await fetch(
            "https://api.igdb.com/v4/covers",
            { method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Client-ID': `${process.env.TWITCH_DEV_CLIENT_ID}`,
                'Authorization': `Bearer ${token}`,
                //"Body":  `where id = (${id});`
              },
              body: `fields *; where id = (${id});`
          })
          return covers.json()
    }
    
    const token = await fetchData();
    const platform = await getPlatform(token, 46)
    const games = await fetchGames(token, platform[0].id);
    const logo = await getPlatformLogo(token, platform[0].platform_logo)


  return (
    <div className="flex flex-col m-auto p-6">
      {`Shop ${decodeURIComponent(params.category)} Consoles`}
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-5 mx-5 gap-5 content-center mb-5">
            
            {games.map(async(game: any, idx: number) => {
                const cover = await fetchCover(token, parseInt(game.cover))
                const img = cover[0].image_id != undefined && cover[0].image_id != null ?`https://images.igdb.com/igdb/image/upload/t_1080p/${cover[0].image_id}.jpg` : "/images/hero.png"
                return(
                  <Link key={idx} href={`/item/${game.id}/${params.platform}`}>
                    <LitImage>
                      <div className="flex flex-col m-auto">
                        <Image src={img} width={400} height={400} alt="" className="bg-contain m-auto"/>
                        <span className="line-clamp-1 text-primary">{game.name}</span>
                      </div>
                    </LitImage>
                  </Link>
                )
            }
            )}
            {/*covers.map((cover: any, idx: number) =>(
                <Image key={idx} src={`https:${cover.url}`} width={200} height={200} alt="test" className="size-full"/>
            ))*/}
    </div>
      <Button asChild className="my-6 mx-6">
        <Link href={`/shop/${params.category}/${parseInt(params.offset)+21}/${params.platform}`}>
          Next Page
        </Link>
      </Button>
    </div>
  )
}