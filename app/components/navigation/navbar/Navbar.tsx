import React from "react";
import Link from "next/link";
import { ModeToggle } from "../../button/ModeToggle";
import Logo from "../../logo/Logo";
//import Logo from "../../logo";
//import Button from "../../button";
import { PiGithubLogoThin, PiLinkedinLogoThin } from "react-icons/pi";
import { SiDiscord, SiYoutube } from "react-icons/si"
import { HiShoppingCart } from "react-icons/hi"

const NavBar = () =>{
    return(
    <>
    <div className="w-full flex h-24 lg:sticky top-0 z-50 bg-slate-900 bg-opacity-20 backdrop-filter backdrop-blur-md overflow-hidden">
      <div className="container m-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <Logo/>
          <SocialLinks/>
        </div>
      </div>
    </div>
  </>
    );
};

function SocialLinks(){
  return(
    <div className="flex items-center gap-2">
      <Link href="/blog" className="hover:text-primary text-2xl">Blog</Link>
      <Link href="/shop" className="hover:text-primary text-2xl flex">{<HiShoppingCart className="text-primary m-auto"/>} Shop</Link>
        <Link
          href="https://discord.gg/QSv2fdMpmW"
          target="_blank"
        >
          <SiDiscord size={42} className="hover:text-primary"/></Link>
        <Link
          href="https://www.youtube.com/@BriteMune-os9gz"
          target="_blank"
        >
          <SiYoutube size={42} className="hover:text-primary"/>
      </Link>
      <ModeToggle/>
    </div>
  )
  
}

export default NavBar;