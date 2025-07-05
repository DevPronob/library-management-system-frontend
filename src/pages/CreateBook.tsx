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
import { useCreateBookMutation } from "@/redux/features/book/bookApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateBook() {
  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });
  const navigate =useNavigate()

  const [createBook] = useCreateBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await createBook(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (res.data?.success) {
        toast.success("Book Created Successfully");
        navigate("/")
      } else if (res.error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error(`Error in ${(res.error as any).data.message}`);
      }
      form.reset();
    } catch (error) {
      toast.error("Internal Server Error")
      console.log(error)
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-50 py-10">
      <Card className="w-full max-w-md h-screen shadow-md ">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Add Book</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Author"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
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

              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input placeholder="ISBN No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="px-0 pt-4">
                <Button type="submit" className="w-full">
                  Save Book
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateBook;
