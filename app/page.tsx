import Image from "next/image";
import Email from "./components/forms/contact";
import { ParallaxHero, ParallaxHeroContainer} from "./components/images/image";
import { LitContainer, LitGrid } from "./components/container/container";
import { serviceInfo } from "./lib/interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Services() {
  
  return (
    <div className="display: flex flex-col text-center overflow-hidden">
      <ParallaxHeroContainer image="/images/hero.png" height={80} text="Britemune">
        <div className="h-96">
          <Button>Read More</Button>
        </div>
      </ParallaxHeroContainer>
    </div>
  )
}
