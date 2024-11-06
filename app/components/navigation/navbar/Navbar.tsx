import React from "react";
import Link from "next/link";
import { ModeToggle } from "../../button/ModeToggle";
import Logo from "../../logo/Logo";
//import Logo from "../../logo";
//import Button from "../../button";
import { RxHamburgerMenu } from "react-icons/rx";
import { SiDiscord, SiYoutube } from "react-icons/si"
import { HiShoppingCart } from "react-icons/hi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const NavBar = () =>{
    return(
    <div>
    <div className="max-sm:scale-0">
      <div className="w-full flex lg:h-24 max-sm:h-0 lg:sticky top-0 z-50 bg-slate-900 bg-opacity-20 backdrop-filter backdrop-blur-md overflow-hidden">
        <div className="container m-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo/>
            <SocialLinks/>
          </div>
        </div>
      </div>
    </div>
    <div className="lg:scale-0 border-b-2 flex border-primary max-sm:h-16">
      <div className="flex m-auto mx-12 ml-16">
        <DropdownMenu>
          <DropdownMenuTrigger><RxHamburgerMenu className="text-2xl text-primary"/></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <div className="m-auto">
                <Link href="/blog" className="hover:text-primary text-2xl flex">Blog</Link>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="m-auto">
                <Link href="/shop" className="hover:text-primary text-2xl flex">Shop</Link>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="m-auto text-2xl">
                <Link
                  href="https://discord.gg/QSv2fdMpmW"
                  target="_blank"
                  className="text-2xl"
                >
                  <SiDiscord size={42} className="hover:text-primary"/>
                </Link>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="m-auto text-2xl">
                <Link
                    href="https://www.youtube.com/@BriteMune-os9gz"
                    target="_blank"
                    className="text-2xl"
                  >
                    <SiYoutube size={42} className="hover:text-primary"/>
                </Link>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="m-auto mx-12">
          <ModeToggle/>
        </div>
      </div>
    </div>
  </div>
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