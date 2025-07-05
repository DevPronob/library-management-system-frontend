import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useBorrowBookMutation } from "@/redux/features/book/bookApi";
import toast from "react-hot-toast";

function BorrowBook() {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const [borrowBook]=useBorrowBookMutation()
  const navigate =useNavigate()
   const { id } = useParams()

  const form = useForm({
    defaultValues: {
      quantity: 1,
      dueDate: undefined,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    const borrowData ={
      book:id,
      quantity:Number(data.quantity),
      dueDate:new Date(date as unknown as string).toISOString()
    }
    try {
     const res = await borrowBook(borrowData).unwrap();
     if(res?.success){
      toast.success("Book Borrowed Successfully")
      navigate("/book-summary")
     }else if (res.error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error(`Error in ${(res.error as any).data.message}`);
      }
      console.log("Book", res);
      form.reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error("Error creating book:", error);
      toast.error(error.data.message)
    }
    console.log("Submitted Data:", { ...data, dueDate: new Date(date as unknown as string).toISOString() ,id});
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center">Borrow Book</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Due Date Picker */}
              <FormField
                control={form.control}
                name="dueDate"
                render={() => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-between w-full font-normal"
                          >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                              setDate(selectedDate);
                              setOpen(false);
                            }}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex justify-end gap-3 px-0">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">Confirm Borrow</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default BorrowBook;
