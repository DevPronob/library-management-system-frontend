/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {  useGetBookQuery,  useUpdateBookMutation } from "@/redux/features/book/bookApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate,  useSearchParams } from "react-router-dom";
function EditBookModal() {
         const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const modal = searchParams.get("modal");
 
  const bookId = searchParams.get("id");
   const [updateBook] =useUpdateBookMutation()  
    const {data:bookData} =useGetBookQuery(bookId)


  const isOpen = modal === "edit" && !!bookId;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    params.delete("id");
    navigate({ search: params.toString() }, { replace: true });
    form.reset()
  };


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
                id:bookId,
                updateData
            })
            if(res.data?.success){
                toast.success("Book Updated Successfully")
            }else if(res.error){
                toast.error(`Error in ${(res.error as any).data.message}`)
            }

            console.log((res.error as any).data.message)
         } catch (error) {
            console.log(error)
         }
        }
  return (
    <div>
            <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      {/* <DialogTrigger asChild>
        <Button variant="outline"
                            size="sm"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50">Edit Book</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>

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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input defaultValue={bookData?.data[0]?.copies}  placeholder="Copies Of Book" type="number" min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer Buttons */}
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save Book</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default EditBookModal