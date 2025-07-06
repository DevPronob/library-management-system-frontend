import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/Spinner";
import {  useGetBookQuery, useUpdateBookMutation } from "@/redux/features/book/bookApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function EditBook() {
  const {id} =useParams()
  const {data:bookData,isLoading} =useGetBookQuery(id)
  
  const [updateBook] =useUpdateBookMutation()  
   const form = useForm();
        console.log(bookData?.data,"SingleBookData")
         const onSubmit: SubmitHandler<FieldValues> = async (data) => {
           console.log(data,"updateData")
  
           const updateData ={
              title: data.title,
            author: data.author,
            genre: data.genre,
            isbn: data.isbn,
            description: data.description,
            copies: data.copies,
            available: data.available,
           }
           try {
            const res =  await updateBook({
                  id:id,
                  updateData
              })
              if(res.data?.success){
                  toast.success("Book Updated Successfully")
              }else if(res.error){
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  toast.error(`Error in ${(res?.error as any)?.data?.message}`)
              }
  
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              console.log(res)
           } catch (error) {
              console.log(error)
              toast.error("Internal Server Error")
           }
          }
          if(isLoading){
   return <Spinner/>
  }
  return (
     <div className="h-full flex items-center justify-center py-10 bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center">Edit Book</CardTitle>
        </CardHeader>
        <CardContent>
         <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input defaultValue={bookData?.data[0]?.title} placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input defaultValue={bookData?.data[0]?.author} placeholder="Author Of Book" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Genre */}
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select  onValueChange={field.onChange} defaultValue={bookData?.data[0]?.genre}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FICTION">Fiction</SelectItem>
                      <SelectItem value="NON_FICTION">Non Fiction</SelectItem>
                      <SelectItem value="SCIENCE">Science</SelectItem>
                      <SelectItem value="HISTORY">History</SelectItem>
                      <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                      <SelectItem value="FANTASY">Fantasy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ISBN */}
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input defaultValue={bookData?.data[0]?.isbn}  placeholder="ISBN No Of Book" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input defaultValue={bookData?.data[0]?.description} placeholder="Description Of Book" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Copies */}
            <FormField
              control={form.control}
              name="copies"
              rules={{ min: 0 }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input defaultValue={bookData?.data[0]?.copies}  placeholder="Copies Of Book" min={0} type="number"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer Buttons */}
              <CardFooter className="px-0 pt-4">
                <Button type="submit" className="w-full">
                  Edit Book
                </Button>
              </CardFooter>
          </form>
        </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditBook