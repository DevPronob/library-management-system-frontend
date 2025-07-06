
import './App.css'
import Navbar from './components/layout/Navbar'
import { Outlet } from 'react-router-dom'
import EditBookModal from './components/modules/books/EditBookModal'
import Footer from './components/layout/Footer'

function App() {

  return (
    <>
    <Navbar/>
    <div className=''>
   <Outlet/>
    </div>
 
    <Footer/>
    <EditBookModal/>
    </>
  )
}

export default App
