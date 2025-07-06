import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface BorrowSummaryItem {
  book: {
    _id: string;
    title: string;
    author: string;
    isbn: string;
  }[];
  totalQuantity: number;
}

interface BorrowSummaryData {
  data: BorrowSummaryItem[];
}

function BorrowSummary({ summary }: { summary: BorrowSummaryData }) {
  return (
    <Card className="w-full max-w-6xl mx-auto py-12">
      <CardHeader>
        <CardTitle>Borrowed Books Summary</CardTitle>
        <CardDescription>List of borrowed books and their total quantities.</CardDescription>
      </CardHeader>

      <CardContent>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 gap-5 h-full">
         {summary.data.map((item, index) => (
          <div key={index} className="mb-6 border p-4 rounded-md shadow-sm ">
            <p className="font-semibold mb-2 text-sm text-muted-foreground">
              Total Quantity: <span className="text-black">{item.totalQuantity}</span>
            </p>

            {item.book.map((book, bookIndex) => (
              <div
                key={bookIndex}
                className="mb-2 p-2  border-primary  rounded border-b-2"
              >
                <p className="font-medium"> {book.title}</p>
                <p className="text-sm text-muted-foreground">ISBN: {book.isbn}</p>
              </div>
            ))}
          </div>
        ))}
       </div>
      </CardContent>
    </Card>
  );
}

export default BorrowSummary;
