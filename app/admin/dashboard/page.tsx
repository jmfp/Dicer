import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { deleteBlog, getAllPosts, isUserAdmin } from "@/actions/actions"
import { redirect } from "next/navigation"
import { getSession } from "@/app/auth/auth"

export default async function Dashboard(){
    
    const [posts, session] = await Promise.all([getAllPosts(), getSession()])
    //const posts = await getAllPosts()
    //const courses = await getAllCourses()
    //if(session){
    //    const userAdmin = await isUserAdmin(session.user.email)
    //    console.log(userAdmin)
    //    if(!userAdmin){
    //        redirect("/")
    //    }
    //}

    return(
        <div className='display: flex flex-col w-full justify-center items-center'>
            <div className='my-2'>
                <p>All Posts</p>
            </div>
            <div className="w-[80%] h-[800px] justify-center rounded-lg border-2 border-primary overflow-y-scroll">
                {!posts.length ? <span/> : 
                    posts.map((post: any, idx: number) =>(
                        <div key={idx} className="display: flex w-[80%] m-auto gap-4 border-2 border-primary  justify-between items-center rounded-lg my-4">
                            <Image 
                                src={post.image} 
                                alt={post.slug} 
                                width={200} 
                                height={200}
                                className="h-[100px] w-[100px] rounded-lg object-cover"
                            />
                            <p>{post.title}</p>
                            <div className="mx-6">
                                <div className="display: flex gap-4 m-auto">
                                    <form action={async () =>{
                                        'use server'
                                        await deleteBlog(post.slug)
                                        //await deleteBlog
                                    }}>
                                        <Button type='submit'>Delete</Button>
                                    </form>
                                    <Button>Edit</Button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="my-2 flex flex-row w-[80%] p-4 gap-2">
                <Button asChild className="m-auto">
                    <Link href="/admin/posts/new">New Post</Link>
                </Button>
            </div>
        </div>
    )
}