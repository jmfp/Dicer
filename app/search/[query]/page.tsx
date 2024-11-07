import { LitImage } from '@/app/components/container/container'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import Image from "next/image"

export default async function Search({params}: {params: {query: string}}) {
    const fetchData = async () =>{
        const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_DEV_CLIENT_ID}&client_secret=${process.env.TWITCH_DEV_SECRET}&grant_type=client_credentials`)
        return response.data.access_token
    }

    const fetchGames = async (token: string) =>{
        const games = await fetch(
            "https://api.igdb.com/v4/games",
            { method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Client-ID': `${process.env.TWITCH_DEV_CLIENT_ID}`,
                'Authorization': `Bearer ${token}`,
              },
              body: `fields *; search "${decodeURIComponent(params.query)}"; limit 100; where category = (${[0, 11]});`
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
        
      } catch (error: any) {
        console.log(error.message)
        return null
      }
    }

    const token = await fetchData()
    const games = await fetchGames(token)
  return (
    <div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-5 mx-5 gap-5 content-center mb-5">
            {games.map(async(game: any, idx: number) => {
                const cover = await fetchCover(token, parseInt(game.cover))
                const img = cover && cover[0] && cover[0].image_id && cover[0].image_id != undefined ?`https://images.igdb.com/igdb/image/upload/t_1080p/${cover[0].image_id}.jpg` : "/images/hero.png"
                return(
                  <Link key={idx} href={`/item/${game.id}/${game.platforms? game.platforms[0] : 7}`}>
                    <LitImage>
                      <div className="flex flex-col w-full">
                        <Image src={img} width={400} height={400} alt="" className="w-full h-full rounded-tl-lg rounded-tr-lg border-b-2 border-primary"/>
                        <span className="line-clamp-1 text-primary text-center my-2">{game.name}</span>
                      </div>
                    </LitImage>
                  </Link>
                )
            }
          )}
      </div>
    </div>
  )
}
