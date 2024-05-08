import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Shop from './Shop/Shop'
import About from './Components/About'
import Blog from './Components/Blog'
import Navbar from './Components/Navbar'
// import SingleBook from './Shop/SingleBook'
import MyFooter from './Components/MyFooter'
import SideBar from './dashboard/SideBar'
import UploadBook from './dashboard/UploadBook'
import ManageBooks from './dashboard/ManageBooks'
import BookList from './dashboard/BookList'
import EditBooks from './dashboard/EditBooks'
import Cart from './Pages/Cart'
import SingleBook from './Shop/SingleBook'
import Reviews from './Pages/Reviews'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Login insideRegister />} />
        <Route path='/home' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        {/* <Route path='/book/:id' element={<SingleBook/>}/> */}
        <Route path='/singleBook/:id' element={<SingleBook />} />
        <Route path='/dashboard' element={<SideBar />} />
        <Route path='/dashboard/upload' element={<UploadBook />} />
        <Route path='/dashboard/editBooks/:id' element={<EditBooks />} />
        <Route path='/dashboard/bookList' element={<BookList />} />
        <Route path='/dashboard/manageBooks' element={<ManageBooks />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
      <MyFooter />
    </>
  )
}

export default App
