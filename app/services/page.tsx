import Email from "../components/forms/contact";
import { ParallaxHero, ParallaxVideo } from "../components/images/image";

export default function Services() {
  return (
    <div className="display: flex flex-col text-center">
        <h2 className="m-auto text-primary text-3xl">Web Design Services In Madison and Northeast Ohio</h2>
        {/*<div className="max-sm: hidden">
        <ParallaxVideo text={"JesseTheDev"}/>
        </div>*/}
        <div className="m-16">
          <h2 className="m-auto text-primary text-3xl">Why Me?</h2>
          <p className="m-auto text-3xl">
            {"I have over 10 years of experience in the field with a Bachelors degree in computer science. I like to take a laid back approach to communication, and a focused approach to work. "}
          </p>
        </div>
        <ParallaxHero image="/images/respsocialsite.png" height={40}/>
        <ParallaxHero image="/images/respwheel.png" height={40}/>
        <div className="m-16 text-center text-3xl">
        <p>{"I like to overdeliver and produce results that both parties can be proud of. With a focus on solving clients individual needs for each project, I enjoy creating a platform that will make you proud to share your content, services or products."}</p>
        </div>
        
        <ParallaxHero image="/images/respsolo.png" height={40}/>
        <ParallaxHero image="/images/resppoke.png" height={40}/>
        <div className="m-16 text-center text-3xl">
        <p>{"Offering backend, frontend, or fullstack custom services I am confident I have the ability to increase your businesses presence on the internet in whatever way you need."}</p>
        </div>
        
        
        <h2 className="m-auto text-primary text-3xl">Contact Me</h2>
        <Email/>
    </div>
  )
}
