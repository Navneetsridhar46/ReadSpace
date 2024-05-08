import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { removeBookAPI } from '../services/allAPI';


function ManageBooks() {

  const [allBooks, setAllBooks] = useState([])

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getBooks()
  }, []);

  const getBooks = async () => {
    fetch("http://localhost:3000/api/product/")
      .then(res => res.json())
      .then(data => {
        setAllBooks(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error("Error fetching books:", error);
        setLoading(false); // Set loading to false on fetch error
      });
  }

  const handleDelete = async (BookId) => {
    const token = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")).token : ''
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      // api call 
      const result = await removeBookAPI(BookId, reqHeader)
      console.log(result);
      if (result.status == 200) {
        alert("Book deleted successfully! :)")
        getBooks();
      } else {
        console.log(result);
      }
    }
  }

  return (
    <div>
      <div className='float-end'>
      <Link to={'/dashboard'}><button className='btn btn-success mt-2 me-2'><i style={{height:'17px'}} class="fa-solid fa-arrow-left me-1"></i>BACK TO DASHBOARD</button></Link>
      </div>
      <h2 className='text-center fw-bold mt-3 p-1'>MANAGE BOOKS</h2>
      
      <div className='d-flex justify-content-center'>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>No.</th>
              <th>BOOK NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>EDIT/MANAGE</th>
            </tr>
          </thead>
          <tbody>
            {/* {allBooks.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.category}</td>
                <td>{book.price}</td>
                <td>{book.quantity}</td>
                <td><img src={book.imageUrl} alt={book.name} /></td>
                <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Link to={`/dashboard/editBooks/${book._id}`}> <button className='btn btn-warning'><i class="fa-solid fa-pen-to-square"></i></button></Link>
                  <button onClick={() => handleDelete(book._id)} className='btn btn-danger ms-2'><i class="fa-solid fa-trash"></i></button>
                </td>
              </tr>
            ))} */}
            {Array.isArray(allBooks) && allBooks?.length > 0 ? (
              allBooks?.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book?.title}</td>
                  <td>{book?.category}</td>
                  <td>{book?.price}</td>
                  <td>{book?.quantity}</td>
                  <td className='text-center'><img style={{height:"50px",width:'50px'}} src={"http://localhost:3000"+book?.imageUrl} alt={book.name} /></td>
                  <td style={{ display: 'flex', justifyContent: 'space-around',padding:"15px" }}>
                    <Link to={{
                      pathname: `/dashboard/editBooks/${book?._id}`                    }}
                    ><button className='btn btn-warning'><i style={{height:"17px"}} class="fa-solid fa-pen-to-square"></i></button></Link>
                    <button onClick={() => handleDelete(book?._id)} className='btn btn-danger ms-2'><i style={{height:"17px"}} class="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No books found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default ManageBooks