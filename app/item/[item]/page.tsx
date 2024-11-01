import { LitContainer } from "@/app/components/container/container"
import { ParallaxHero, ParallaxHeroShort } from "@/app/components/images/image"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"

export default async function ShopItem({params}: {params: {item: string}}) {

  
  const fetchData = async () =>{
    const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_DEV_CLIENT_ID}&client_secret=${process.env.TWITCH_DEV_SECRET}&grant_type=client_credentials`)
    return response.data.access_token
  }

  const fetchVideo = async (token: string, id: number) => {
    const video = await fetch(
      "https://api.igdb.com/v4/game_videos",
      { method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': `${process.env.TWITCH_DEV_CLIENT_ID}`,
          'Authorization': `Bearer ${token}`,
        },
        body: `fields *; where id = (${id});`
    })
    return video.json()
  }

  const fetchGames = async (token: string, id: number) =>{
    const games = await fetch(
        "https://api.igdb.com/v4/games",
        { method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Client-ID': `${process.env.TWITCH_DEV_CLIENT_ID}`,
            'Authorization': `Bearer ${token}`,
          },
          body: `fields *; where id = (${id});`
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

  const fetchScreenshots = async(token: string, ids:any) =>{
    const screenshots = await fetch(
      "https://api.igdb.com/v4/screenshots",
      { method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': `${process.env.TWITCH_DEV_CLIENT_ID}`,
          'Authorization': `Bearer ${token}`,
        },
        body: `fields *; where id = (${ids});`
    })
    return screenshots.json()
  }

  const getPlatform = async (token: string, id: any) =>{
    const platform = await fetch(
        "https://api.igdb.com/v4/platforms",
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

  const token = await fetchData();
  const games = await fetchGames(token, parseInt(params.item))
  const cover = await fetchCover(token, games[0].cover)
  const coverUrl = cover[0].image_id != undefined ? `https://images.igdb.com/igdb/image/upload/t_1080p/${cover[0].image_id}.jpg` : "/images/hero.png"
  const screenshots = await fetchScreenshots(token, games[0].screenshots)
  const platform = await getPlatform(token, games[0].platforms[0])
  const video = games[0].videos ? await fetchVideo(token, games[0].videos[0]) : null
  const heroUrl = screenshots[0].image_id == undefined ? "/images/hero.png" : `https://images.igdb.com/igdb/image/upload/t_1080p/${screenshots[0].image_id}.jpg`
  const ebayURL = `https://www.ebay.com/sch/i.html?_nkw=${`${games[0].name} ${platform[0].name}`}&_sacat=0&_from=R40&_trksid=p2334524.m570.l1311&_odkw=gamecube&_osacat=0&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339086170&customid=gamecube&toolid=10001&mkevt=1`
  return (
    <div>
      <ParallaxHeroShort image={heroUrl} height={25}/>
      <div className="p-6">
        <LitContainer>
          <div className="flex flex-col">
            <div className="flex flex-row max-sm:flex-col">
              <Image src={coverUrl} height={200} width={200} alt={games[0].name} className="size-[800px] rounded-tl-lg rounded-bl-lg border-r-2 border-primary max-sm:rounded-tr-lg max-sm:border-b-2 max-sm:border-r-0 max-sm:rounded-bl-none"/>
              <div className="flex flex-col p-6">
                <h1 className="text-primary text-4xl m-auto">{games[0].name}</h1>
                {games[0].storyline == undefined ? null : 
                <div>
                  <h2 className="text-primary text-2xl m-auto">Story</h2>
                  <p className="m-auto text-xl">{games[0].storyline}</p>
                </div>
                }
                {games[0].summary == undefined ? null : 
                <div>
                  <h2 className="text-primary text-2xl m-auto">Summary</h2>
                  <p className="m-auto text-xl">{games[0].summary}</p>
                </div>
                }
                <Button asChild>
                  <Link href={ebayURL} target="_blank">
                    Shop on Ebay
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </LitContainer>
        {video ? 
        <LitContainer>
          <iframe src={`https://www.youtube.com/embed/${video[0].video_id}`} allowFullScreen className="w-full h-[900px] rounded-lg"/>
        </LitContainer> : null}
        
      </div>
    </div>
  )
}
