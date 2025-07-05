import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/features/book/bookApi";
import { cn } from "./../../../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";

function BookTable() {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const handleEditButton = (id: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", "edit");
    searchParams.set("id", id);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  // 🧠 Step 1: Store book id when user clicks delete
  const handleDeleteClick = (id: string) => {
    setSelectedBookId(id);
    setOpenDeleteModal(true);
  };

  // ✅ Step 2: Actually delete when user confirms
  const confirmDelete = async () => {
    if (selectedBookId) {
      await deleteBook(selectedBookId);
      setOpenDeleteModal(false);
      setSelectedBookId(null);
    }
  };

  if (isLoading) return <p className="p-4 text-center">Loading books...</p>;
  if (isError)
    return (
      <p className="p-4 text-center text-red-500">Error fetching books.</p>
    );

  return (
    <div className="py-10">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((book) => (
              <TableRow key={book.isbn}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  {book.available ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Unavailable
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">

                    <Link to={`/book-details/${book._id}`}>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        View
                      </Button>
                    </Link>
                    <Link to={`/edit-book/${book._id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      
                    >
                      Edit
                    </Button>
                    </Link>

                    {book.available ? (
                     <Link to={`/borrow-book/${book._id}`}>
                    <Button
                      variant="default"
                      size="sm"
                    >
                      Borrow
                    </Button>
                    </Link>
                  ) : (
                 
                    <Button
                      variant="default"
                      size="sm"
                      disabled={true}
                    >
                      Borrow
                    </Button>
                   
                  )}

                   

                    

                    <Button
                      onClick={() => handleDeleteClick(book._id)}
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Delete Modal Component */}
      <DeleteConfirmModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default BookTable;
