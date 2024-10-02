import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export async function NewsletterBottomAd(props: {offer: string}) {
  return (
    <div className="flex flex-col justify-items-center text-center mx-auto h-96">
        <div className="text-center m-auto">
            <h1 className="text-6xl text-primary text-center m-auto">Join Our Newsletter</h1>
            <p className="text-2xl m-auto text-white">Old Games <span className="text-primary text-2xl m-auto">New News</span></p>
            <form action={async() => {
                'use server'
                //add to mailchimp list
            }} className="flex flex-col gap-3">
                <Input name="name" placeholder="First Name" className="caret-primary"/>
                <Input name="email" type="email" placeholder="E-Mail" className="caret-primary"/>
                <Button type="submit">Signup</Button>
            </form>
        </div>
    </div>
  )
}
