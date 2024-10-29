import { addCategory } from "@/actions/actions";
import AddPost from "@/app/components/newpost/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewPost() {
  return (
    <div>
        <AddPost />
        <form action={async(formData: FormData) => {
            'use server'
            await addCategory(formData)
        }}>
            <Input placeholder="Add New Category" name="newcat"/>
            <Button type="submit">
                Add Category
            </Button>
        </form>
    </div>
  )
}
