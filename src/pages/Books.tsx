import AppLayout from "@/components/layout/AppLayout"
import AddBookModal from "@/components/modules/books/AddBookModal";
import BookTable from "@/components/modules/books/BookTable";




function Books() {
  return (
    <div className="mt-5 h-screen bg-gray-50">
       <AppLayout>
        <div className="flex items-center justify-between py-3">
                <h3 className="font-bold text-2xl">All Books</h3>
                <AddBookModal />
              </div>
        <BookTable/>
       </AppLayout>
    </div>
  )
}

export default Books