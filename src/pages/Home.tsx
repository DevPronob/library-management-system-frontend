import AppLayout from '@/components/layout/AppLayout'
import BookTable from '@/components/modules/books/BookTable'
import React from 'react'

function Home() {
  return (
    <div>
        <div className="mt-5 bg-gray-50 ">
           <AppLayout>
            <BookTable/>
           </AppLayout>
           </div>
           </div>
  )
}

export default Home