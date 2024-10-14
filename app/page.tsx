import Image from "next/image";
import Email from "./components/forms/contact";
import { ParallaxHero, ParallaxHeroContainer} from "./components/images/image";
import { BlogCard, LitContainer, LitGrid } from "./components/container/container";
import { serviceInfo } from "./lib/interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NewsletterBottomAd } from "./components/newsletter/newsletter";
import { getAllPosts } from "@/actions/actions";

export default async function Services() {
  const posts = await getAllPosts()
  return (
    <div className="display: flex flex-col text-center overflow-hidden">
      <ParallaxHeroContainer image="/images/hero.png" height={80} text="">
        <span className="h-[500px]"/>
        {/*<div className="h-96">
          <Button>Read More</Button>
        </div>*/}
      </ParallaxHeroContainer>
      <div className="flex flex-col size-full p-6">
        <LitContainer>
          <NewsletterBottomAd offer="" />
        </LitContainer>
        <div className="size-[75%] flex flex-col m-auto mt-6">
          <h2 className="text-primary text-4xl">Latest Post</h2>
          <BlogCard image={posts[posts.length - 1].image} title={posts[posts.length - 1].title} slug={posts[posts.length - 1].slug} description={posts[posts.length - 1].description}/>
        </div>
      </div>

    </div>
  )
}
