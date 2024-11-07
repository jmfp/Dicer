import Image from "next/image";
import Email from "./components/forms/contact";
import { ParallaxHero, ParallaxHeroContainer} from "./components/images/image";
import { BlogCard, LitContainer, LitGrid, ReviewCard } from "./components/container/container";
import { serviceInfo } from "./lib/interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NewsletterBottomAd } from "./components/newsletter/newsletter";
import { getAllPosts } from "@/actions/actions";
import axios from "axios";

export default async function Services() {
  const heroGames = {
    "Resident Evil 2": 4017,
    "san-andreras": 34971,
    "bully": 144661,
    "ocarina-of-time": 84528,
    "mario-world": 67897,
    "mortal-kombat-3": 104503
  }
  const posts = await getAllPosts()
  const fetchData = async () =>{
    const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_DEV_CLIENT_ID}&client_secret=${process.env.TWITCH_DEV_SECRET}&grant_type=client_credentials`)
    return response.data.access_token
  }
  const token = await fetchData()
  const fetchArtworks = async(token: string) =>{
    try {
      const covers = await fetch(
        "https://api.igdb.com/v4/artworks",
        { method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Client-ID': `${process.env.TWITCH_DEV_CLIENT_ID}`,
            'Authorization': `Bearer ${token}`,
            //"Body":  `where id = (${id});`
          },
          body: `fields *; where id = (${[ 4017, 104503, 84528, 34971, 67897, 144661,]});`
      })
      return covers.json()
      
    } catch (error: any) {
      console.log(error.message)
      return null
    }
  }

  const artworks = await fetchArtworks(token)
  const randArt = Math.floor(Math.random() * (0 - 6) + 6)
  console.log(randArt)
  const hero_url = `https://images.igdb.com/igdb/image/upload/t_1080p/${artworks[randArt].image_id}.jpg`
  return (
    <div className="display: flex flex-col text-center overflow-hidden">
      <ParallaxHero image={artworks ? hero_url : "/images/hero.png"} height={50}>{/*text="test">*/}
        {/*<Button className="m-auto">Test</Button>*/}
      </ParallaxHero>
      <div className="flex flex-col size-full p-6">
        <LitContainer>
          <NewsletterBottomAd offer="" />
        </LitContainer>
        <div className="size-[75%] flex flex-col m-auto mt-6">
          <h2 className="text-primary text-4xl">Latest Post</h2>
          <BlogCard image={posts[posts.length - 1].image} title={posts[posts.length - 1].title} slug={posts[posts.length - 1].slug} description={posts[posts.length - 1].description}/>
          <div className="m-auto my-6">
            <ins className="epn-placement" data-config-id="fff10dbd146b6c47655b729b"></ins>
          </div>
        </div>
      </div>
    </div>
  )
}
