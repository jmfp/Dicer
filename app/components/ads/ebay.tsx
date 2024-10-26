import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LitContainer } from '../container/container'
import { Button } from '@/components/ui/button';

export default async function Ebay(props: {image: any, search: any, productName: any}) {
    const searchString = props.search.replace(/ /g, '+');
  return (
    <div className="flex flex-col w-[25%] m-auto max-sm:w-[90%]">
        <LitContainer>
        <Image className="rounded-tl-lg rounded-bl-lg" src={props.image} alt="" width={200} height={200}/>
            <div className="flex flex-col m-auto p-2">

            <h2 className='m-auto my-2'>{props.productName}</h2>
                <Button asChild>
                    <Link href={`https://www.ebay.com/sch/i.html?_nkw=${searchString}&_sacat=0&_from=R40&_trksid=p2334524.m570.l1311&_odkw=gamecube&_osacat=0&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339086170&customid=gamecube&toolid=10001&mkevt=1`} target="_blank">  
                        Buy Now
                    </Link>
                </Button>
                <span className="text-sm m-auto bottom-1 my-2">*affiliate link</span>
            </div>
        </LitContainer>
    </div>
  )
}
