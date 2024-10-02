import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation/navbar/Navbar"
import {ThemeProvider} from './components/theme-provider'
import { Providers } from "../app/blog/[slug]/providers";
//import { Toaster } from "@/components/ui/toaster";

import { GoogleAnalytics } from '@next/third-parties/google'


const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({subsets: ["latin"]});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.Britemune.com"),
  keywords: ["Britemune", "retro game reviews", "retro gaming", "retro game streaming platform", "pokemon",
    "indie gaming", "game development", "indie game development", "nintendo", "playstation", "xbox", "playstation 2", 
    "gamecube", "nintendo 64", "n64", "godot engine", "legend of zelda", "next", "next.js", "nextjs", "unity",
    "unity engine",
  ],
  title: {
    default: "Britemune",
    template: "%s | Britemune"
  },
  openGraph: {
    description: "retro game reviews"
  },
  twitter:{
    card: "summary_large_image"
  }
  //description: "Software Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <meta name="google-adsense-account" content="ca-pub-9522353240660967"></meta>
      <body className={`${nunito.className} top-0`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
          <Navigation/>
          {/*<Toaster/>*/}
          {children}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" async></script>
          <script async>hljs.highlightAll();</script>
          <script async>hljs.highlightOnLoad();</script>
          </Providers>
        </ThemeProvider>
      </body>
      {/*<GoogleAnalytics gaId="G-ZJMTS01ZQZ" />*/}
    </html>
  );
}
