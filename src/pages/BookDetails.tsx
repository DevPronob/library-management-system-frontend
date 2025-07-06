import { useGetBookQuery } from '@/redux/features/book/bookApi'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { useParams } from 'react-router-dom'
import Spinner from '@/components/ui/Spinner'

function BookDetails() {
      const { id } = useParams()
        const { data: bookData,isLoading } = useGetBookQuery((id) as string)
        if(isLoading){
            return <Spinner/>
        }
        console.log(bookData?.data)
  return (
    <div className='flex items-center flex-col py-12 bg-gray-50'>
         <Card className="w-full max-w-sm ">
      <CardHeader>
      </CardHeader>
      <CardContent>
       <div>
        <h3  className='font-bold text-xl'>{bookData?.data[0].title}</h3>
        <h4 className='text-[14px]'>{`Author: ${bookData?.data[0].author}`}</h4>
        <div className='py-3'>
            <p>{bookData?.data[0].description}</p>
        </div>
        <div className=''>
            <div className='flex gap-8'>
                <p className='font-bold'>ISBN:</p>
                <p>{bookData?.data[0].isbn}</p>
            </div>
            <div className='flex gap-8'>
                <p className='font-bold'>Genre:</p>
                <p>{bookData?.data[0].genre}</p>
            </div>
            <div className='flex gap-8'>
                <p className='font-bold'>Total Copies:</p>
                <p>{bookData?.data[0].copies}</p>
            </div>
        </div>
       </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default BookDetails