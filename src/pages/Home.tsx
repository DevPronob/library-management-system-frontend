import AppLayout from '@/components/layout/AppLayout'
import BookTable from '@/components/modules/books/BookTable'

function Home() {
  return (
    <div>
        <div className=" bg-gray-50 ">
           <AppLayout>
            <BookTable/>
           </AppLayout>
           </div>
           </div>
  )
}

export default Home