import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// import { Link } from 'react-router-dom'
import Book from './pages/book/Book'
import Home from './pages/home/home'
import Footer from './components/footer/footer'


function App() {

  const router = createBrowserRouter([
    {path: "/",
     element:<Home/>
    },
    {path: "/book/:id",
     element:<Book/>
    },
  ])

  return (
    <>
    <RouterProvider router={router}/>
    <Footer/>
    </>
  )
}

export default App
