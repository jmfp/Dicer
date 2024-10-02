'use client'

import RichText from "@/app/components/text/RichText";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { addBlog } from "@/actions/actions";
import { Textarea } from "@/components/ui/textarea";

export default function AddPost(){

    const formSchema = z.object({
        title: z.string().min(5, {message: 'Minimum title of 5 characters'}),
        image: z.string().min(1, {message: 'Image is required'}),
        slug: z.string().min(1, {message: 'slug is required'}),
        description: z.string().min(2, {message: 'description is required'}),
        content: z.string().min(1, {message: 'content is required'}),
        category: z.string().min(1, {message: 'category is required'}),
        previous: z.string(),
        next: z.string(),
        keywords: z.array(z.string()),
        keywords_string: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues:{
            title: '',
            image: '',
            slug: '',
            description: '',
            content: '',
            category: '',
            previous: '',
            next: '',
            keywords: [''],
            keywords_string: ''
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>){
        await addBlog(values)
    }

    function generateSlug(articleTitle: string){
        if(articleTitle !== ''){
            articleTitle.replace(/ /g,"-")
        }
    }

    return(
        <div>
            <main className="p-24">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                        control={form.control}
                        name="image"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input placeholder="Article Image Url" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Article Title" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="Article Slug" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <RichText description={field.name} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Content" {...field}/>
                                    {/*<RichText description={field.name} onChange={field.onChange}/>*/}
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="Category" onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="previous"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Previous Article Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="Previous Article Slug" onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="next"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Next Article Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="Next Article Slug" onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="keywords_string"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Keywords</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Keywords Comma Separated, No Spaces Between Keywords" onChange={field.onChange}/>
                                    </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type='submit'>Submit</Button>
                </form>
            </Form>
            </main>
        </div>
    )
}