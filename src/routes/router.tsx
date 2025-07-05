import Books from "@/pages/Books";
import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/EditBook";
import { createBrowserRouter } from "react-router-dom";
import App from './../App';
import Home from "@/pages/Home";
import BookSummary from "@/pages/BookSummary";
import BookDetails from "@/pages/BookDetails";
import BorrowBook from "@/pages/BorrowBook";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        index:true,
        element: <Home />,
      },
        {
            path:'/books',
            element:<Books/>
        },
        {
            path:'/create-book',
            element:<CreateBook/>
        },
        {
            path:'/edit-book/:id',
            element:<EditBook/>
        },
        {
            path:'/book-summary',
            element:<BookSummary/>
        },
         {
            path:'/book-details/:id',
            element:<BookDetails/>
        },
         {
            path:'/borrow-book/:id',
            element:<BorrowBook/>
        },
    ]
  },
]);