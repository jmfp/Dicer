import Image from "next/image";
import Email from "./components/forms/contact";
import { ParallaxHero, ParallaxHeroContainer} from "./components/images/image";
import { BlogCard, LitContainer, LitGrid, ReviewCard } from "./components/container/container";
import { serviceInfo } from "./lib/interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NewsletterBottomAd } from "./components/newsletter/newsletter";
import { getAllPosts } from "@/actions/actions";

export default async function Services() {
  const posts = await getAllPosts()
  return (
    <div className="display: flex flex-col text-center overflow-hidden">
      <ParallaxHero image="/images/hero.png" height={50}/>
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
