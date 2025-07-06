import BorrowSummary from "@/components/modules/books/BorrowSummary";
import Spinner from "@/components/ui/Spinner";
import { useGetBorrowSummaryQuery } from "@/redux/features/book/bookApi";


function BookSummary() {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);
  console.log(data,"data")

  if (isLoading) return <Spinner/>
  return (
    <div className="bg-gray-50 py-12">
      <div>
        <BorrowSummary summary={data} />
      </div>
    </div>
  );
}

export default BookSummary;
