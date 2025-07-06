

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
   <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Borrow Summary</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Rank</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Book Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ISBN</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Total Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {summary?.data?.map((item, index) => {
              const book = item.book[0]; // book is an array due to aggregation

              return (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 text-sm">{book.title}</td>
                  <td className="px-6 py-4 text-sm">{book.isbn}</td>
                  <td className="px-6 py-4 text-sm">
                    {item.totalQuantity} copies
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BorrowSummary;
