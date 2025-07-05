import BorrowSummary from "@/components/modules/books/BorrowSummary";
import { useGetBorrowSummaryQuery } from "@/redux/features/book/bookApi";
import React from "react";

function BookSummary() {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);
  console.log(data,"data")

  if (isLoading) return <p className="text-center mt-8">Loading...</p>;
  return (
    <div className="bg-gray-50 py-4">
      <div>
        <BorrowSummary summary={data} />
      </div>
    </div>
  );
}

export default BookSummary;
