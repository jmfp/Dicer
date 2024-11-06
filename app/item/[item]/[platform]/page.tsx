import { LitContainer } from "@/app/components/container/container"
import { ParallaxHero, ParallaxHeroShort } from "@/app/components/images/image"
import { NewsletterBottomAd } from "@/app/components/newsletter/newsletter"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export async function generateMetadata({params}: {params: {item: string}}): Promise<Metadata>{
  const fetchData = async () =>{
    const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_DEV_CLIENT_ID}&client_secret=${process.env.TWITCH_DEV_SECRET}&grant_type=client_credentials`)
    return response.data.access_token
  }
  const token = await fetchData()

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
  const game = await fetchGames(token, parseInt(params.item))
  const keywords = game[0].name
  return{
    title: game[0].name,
    description: game[0].name,
    keywords: keywords,
    openGraph: {
      images: [
        {
          url: "/images/hero.png" 
        }
      ]
    },
    twitter:{
      card: "summary_large_image"
    }
  }
}

export default async function ShopItem({params}: {params: {item: string, platform: string}}) {

  
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
    try {
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
    } catch (error : any) {
      console.log(error.message)
      return null
    }
  }

  const fetchScreenshots = async(token: string, ids:any) =>{
    try {
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
    } catch (error : any) {
      console.log(error.message)
      return null
    }
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
  const coverUrl = cover[0].status != 400 && cover[0].image_id != undefined ? `https://images.igdb.com/igdb/image/upload/t_1080p/${cover[0].image_id}.jpg` : "/images/hero.png"
  const screenshots = await fetchScreenshots(token, games[0].screenshots)
  const platform = await getPlatform(token, games[0].platforms)
  const video = games[0].videos ? await fetchVideo(token, games[0].videos) : null
  const heroUrl = screenshots[0].image_id == undefined || screenshots[0].image_id == null ? "/images/hero.png" : `https://images.igdb.com/igdb/image/upload/t_1080p/${screenshots[0].image_id}.jpg`
  //const ebayURL = `https://www.ebay.com/sch/i.html?_nkw=${`${games[0].name} ${platform[0].name}`}&_sacat=0&_from=R40&_trksid=p2334524.m570.l1311&_odkw=gamecube&_osacat=0&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339086170&customid=gamecube&toolid=10001&mkevt=1`
  return (
    <div>
      <ParallaxHeroShort image={heroUrl} height={25}/>
      <div className="flex flex-col p-6">
        <LitContainer>
          <div className="flex flex-col">
            <div className="flex flex-row max-sm:flex-col">
              <Image src={coverUrl} height={200} width={200} alt={games[0].name} className="size-[800px] rounded-tl-lg rounded-bl-lg border-r-2 border-primary max-sm:rounded-tr-lg max-sm:border-b-2 max-sm:border-r-0 max-sm:rounded-bl-none max-sm:h-[400px] max-sm:w-full"/>
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
                {platform.map((plat: any, idx : number) => {
                  return(
                    <Link key={idx} href={`https://www.ebay.com/sch/i.html?_nkw=${`${games[0].name} ${plat.name}`}&_sacat=0&_from=R40&_trksid=p2334524.m570.l1311&_odkw=gamecube&_osacat=0&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339086170&customid=gamecube&toolid=10001&mkevt=1`}>
                      <div className="flex border-2 border-primary rounded-lg h-12 my-2 hover:bg-primary hover:text-white">
                        <p className="m-auto">
                          {`Shop for ${plat.name} version`}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </LitContainer>
        
        {//TODO: change all content checks to check for status 400
        screenshots[0].status == 400 ? null : 
        <Carousel className="p-6 mx-12">
          <CarouselContent>
            {screenshots.map(async(screen: any, idx: number) => {
              return(
                <CarouselItem className="lg:basis-1/3" key={idx}>
                    <div className="border-2 rounded-lg border-primary">
                      <Image src={screen && screen.image_id ? `https://images.igdb.com/igdb/image/upload/t_1080p/${screen.image_id}.jpg` : `/images/hero.png`} width={200} height={200} alt={`${games[0].name}`} className="w-full rounded-lg h-[350px] max-sm:h-[175px]"/>
                    </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        
        }
        {video ? 
          video.map((vid : any, idx: number) =>{
            return(
              <LitContainer key={idx}>
                <iframe src={`https://www.youtube.com/embed/${vid.video_id}`} allowFullScreen className="w-full h-[900px] rounded-lg max-sm:h-[225px] m-auto"/>
              </LitContainer>
            )
          }) : null}
        <LitContainer>
          <NewsletterBottomAd offer="Free SEO Checklist"/>
        </LitContainer>
        <div className="display:flex text-4xl text-primary m-auto">
          <h2 className="m-auto">Similar Games</h2>
        </div>
        <Carousel className="display:flex flex-col p-6 mx-12">
          <CarouselContent>
            {games[0].similar_games.map(async(game: any, idx: number) => {
              const thisGame = await fetchGames(token, game)
              const plat = thisGame[0].platforms ? await getPlatform(token, thisGame[0].platforms[0]) : 7
              const img = await fetchCover(token, thisGame[0].cover)
              return(
                <CarouselItem className="lg:basis-1/3 display:flex flex-col " key={idx}>
                  <Link href={`/item/${thisGame[0].id}/${plat.id}`}>
                    <div className="display:flex flex-col border-2 rounded-lg border-primary">
                      <Image src={img[0] && img[0].image_id ? `https://images.igdb.com/igdb/image/upload/t_1080p/${img[0].image_id}.jpg` : `/images/hero.png`} width={200} height={200} alt={`${thisGame[0].name}`} className="w-full rounded-tl-lg rounded-tr-lg h-[700px] max-sm:h-[300px]"/>
                      <p className="display:flex justify-center text-center m-auto my-6 text-primary">{thisGame[0].name}</p>
                    </div>
                  </Link>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

      </div>
    </div>
  )
}
