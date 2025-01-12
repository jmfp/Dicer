import { handle } from "@/actions/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"

export async function NewsletterBottomAd(props: {offer: string}) {
  return (
    <div className="flex flex-col justify-items-center text-center mx-auto h-96">
        <div className="text-center m-auto">
            <h1 className="text-6xl text-primary text-center m-auto">Join Our Newsletter</h1>
            <p className="text-2xl m-auto text-white">Old Games <span className="text-primary text-2xl m-auto">New News</span></p>
            <p className="text-white">New developments in the indie and retro scene.</p>
            <p className="text-white">Find new and interesting <span className="text-primary">information, stories, products</span> and <span className="text-primary">more</span> in your inbox.</p>
            <form action={async(formData: FormData) => {
              'use server'
                const email = formData.get("email")
                const _name = formData.get("name")
                await handle(email, _name)
            }} className="flex flex-col gap-3 p-3">
                <Input name="name" placeholder="First Name" required className="caret-primary"/>
                <Input name="email" type="email" placeholder="E-Mail" required className="caret-primary"/>
                <Button className="mb-12" type="submit">Signup</Button>
            </form>
        </div>
    </div>
  )
}
