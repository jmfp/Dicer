import React from "react";
import Link from "next/link";
//import Logo from "../../logo";
//import Button from "../../button";
import Image from 'next/image'

const Logo = () =>{
    return(
        <div className="prose-2xl">
        <Link
          href="/"
        >
          <Image src="/images/hero.png" height={100} width={100} alt="Retro and indie video games"/>
        </Link>
        </div>
    );
};

export default Logo;