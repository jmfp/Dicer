import { getAllPosts } from '@/actions/actions'
import axios from 'axios'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET(request: Request) {

    const plats = [123, 120, 119, 57, 87, 58, 33, 24, 22, 21, 20, 18, 4, 78, 35, 32, 29, 23, 38, 8, 7]

  const fetchData = async () =>{
    const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_DEV_CLIENT_ID}&client_secret=${process.env.TWITCH_DEV_SECRET}&grant_type=client_credentials`)
    return response.data.access_token
  }

  const fetchGames = async (token: string, platform: any) =>{
    try {

      const games = await fetch(
        "https://api.igdb.com/v4/games",
        { method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Client-ID': `${process.env.TWITCH_DEV_CLIENT_ID}`,
            'Authorization': `Bearer ${token}`,
          },
          body: `fields *; where release_dates.platform = (${platform}) & category = (${[11, 0]}); limit 500; sort name;`
      })
    return games.json()
      
    } catch (error: any) {
      console.log(error.message)
    }
  }



  // Method to source urls from cms
  const urls = await getAllPosts()
  // get game pages
  const token = await fetchData()
  const post = urls?.map((post:any) =>{
    return{
        loc: `https://www.britemune.com/blog/${post?.slug}`,
        lastmod: post?.updatedAt.toISOString()
    }
  })

  //getting games for each system
  //const [game1, game2, game3, game4, game5, game6, game7, game8, game9, game10, game11, game12, game13, game14, game15, game16]//, //game17,
    //game18, game19, game20, game21
    const [game1, game2, game3, game4, game5, game6, game7, game8, game9, game10, game11, game12, game13, game14, game15] = await Promise.all([fetchGames(token, plats[0]), fetchGames(token, plats[1]), fetchGames(token, plats[2]), fetchGames(token, plats[3]), fetchGames(token, plats[4]),
  fetchGames(token, plats[5]), fetchGames(token, plats[6]), fetchGames(token, plats[7]), fetchGames(token, plats[8]), fetchGames(token, plats[9]),
  fetchGames(token, plats[10]), fetchGames(token, plats[11]), fetchGames(token, plats[12]), fetchGames(token, plats[13]), fetchGames(token, plats[14])])//fetchGames(token, plats[18]), fetchGames(token, plats[19]),
  //fetchGames(token, plats[20])])

  const g1 = game1?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}/0`,
      lastmod: new Date().toISOString()
    }
  })

  const g2 = game2?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g3 = game3?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g4 = game4?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g5 = game5?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g6 = game6?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g7 = game7?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g8 = game8?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g9 = game9?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g10 = game10?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g11 = game11?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g12 = game12?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g13 = game13?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g14 = game14?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  const g15 = game15?.map((game: any) =>{
    return {
      loc: `https://www.britemune.com/item/${game.id}`,
      lastmod: new Date().toISOString()
    }
  })

  //const g16 = game16?.map((game: any) =>{
  //  return {
  //    loc: `https://www.britemune.com/item/${game.id}`,
  //    lastmod: new Date().toISOString()
  //  }
  //})

  //const g17 = game17?.map((game: any) =>{
  //  return {
  //    loc: `https://www.britemune.com/item/${game.id}`,
  //    lastmod: new Date().toISOString()
  //  }
  //})

  //const g18 = game18?.map((game: any) =>{
  //  return {
  //    loc: `https://www.britemune.com/item/${game.id}`,
  //    lastmod: new Date().toISOString()
  //  }
  //})

  //const g19 = game19?.map((game: any) =>{
  //  return {
  //    loc: `https://www.britemune.com/item/${game.id}`,
  //    lastmod: new Date().toISOString()
  //  }
  //})

  //const g20 = game20?.map((game: any) =>{
  //  return {
  //    loc: `https://www.britemune.com/item/${game.id}`,
  //    lastmod: new Date().toISOString()
  //  }
  //})
//
  //const g21 = game21?.map((game: any) =>{
  //  return {
  //    loc: `https://www.britemune.com/item/${game.id}`,
  //    lastmod: new Date().toISOString()
  //  }
  //})

  //const _games = _allGames.map((game:any) =>{
  //  return{
  //    loc: `https://www.britemune.com/item/${game.id}`,
  //    lastmod: new Date().toISOString()
  //  }
  //})
  return getServerSideSitemap([
    {
      loc: `https://britemune.com`,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    //...lst,
    ...post,
    ...g1,
    ...g2,
    ...g3,
    ...g4,
    ...g5,
    ...g6,
    ...g7,
    ...g8,
    ...g9,
    ...g10,
    ...g11,
    ...g12,
    ...g13,
    ...g14,
    ...g15,
  ])
}