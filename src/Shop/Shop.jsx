import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, getUserCartAPI } from '../services/allAPI';
import useCartStore from '../services/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typeahead } from "react-bootstrap-typeahead";
import { BsSearch } from "react-icons/bs";


function Shop() {

  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchString, setSearchString] = useState('');


  const [cart, setCart] = useState([])
  const [books, setBooks] = useState([])

  const { setTotalQuantity } = useCartStore();

  useEffect(() => {
    fetch("http://localhost:3000/api/product/").then(res => res.json()).then(data => setBooks(data))
  }, [])

  const handleAddToCart = async (bookId, bookTitle, bookPrice) => {
    const newCartItem = { productId: bookId, title: bookTitle, price: bookPrice, quantity: 1 };
    setCart([...cart, newCartItem]);
    const token = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")).token : '';
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };
      // API call
      try {
        const result = await addToCart(newCartItem, reqHeader);
        console.log(result);
        if (result.status === 200) {
          setTotalQuantity(result.data.length);
          setTimeout(() => {
            toast.success("Book added to cart")

          }, 400)
        } else {
          console.log(result.response);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  async function fetchCartItems() {
    const token = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")).token : ''
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const response = await getUserCartAPI(reqHeader)
        if (response.status == 200) {
          setCart(response.data)
          setTotalQuantity(result.data.length);
        } else {
          console.error("Error fetching cart items")
        }
      } catch (error) {
        console.error("Error fetching cart items")
      }
    }

  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchResults([searchTerm]);
  };


  return (
    <>
      <Navbar className="bg-dark justify-content-center">
        <Form inline onSubmit={handleSubmit}>
          <Row>
            <Col xs="auto">
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onChange={(selected) => {
                    navigate(`/singleBook/${selected[0]?._id}`);
                    books
                  }}
                  options={books}
                  paginate={true}
                  labelKey={"title"}
                  onKeyDown={(selected) => {
                    setSearchString(selected.currentTarget.value + selected.key);
                    if (selected.code === 'Enter') {
                      getSearchResult(searchString);
                    }
                  }}
                  minLength={2}
                  placeholder="Search for products here"
                />
                <span className="input-group-text p-3" id="addon-wrapping">
                  <BsSearch className="fs-6" onClick={() => getSearchResult(searchString)} />
                </span>
              </div>
            </Col>
          </Row>
        </Form>
        {/* Display search results */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Search Results:</h3>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}
      </Navbar>

      <div className='mt-3 text-center container-fluid'>
        <h2 className='fw-bolder p-1 mb-2'>All Books are Here!</h2>

        <div style={{ justifyContent: 'space-around' }} className='d-flex'>
          <div><Link to={'/home'}><button className='btn btn-warning'><i style={{ height: "17px" }} class="fa-solid fa-angles-left me-1"></i>BACK TO HOME</button></Link></div>
          <div><Link to={'/cart'}><button className='btn btn-success'><i style={{ height: "17px" }} class="fa-solid fa-angles-right me-1"></i>CART</button></Link></div>
        </div>

        <div style={{ gap: '20px', justifyContent: 'center' }} className='row container-fluid mt-4 mb-4'>
          {
            books.map(book => <Card className='shadow' style={{ width: '18rem', height: '30rem' }}>
              <Card.Img style={{ height: "50%" }} variant="top" src={"http://localhost:3000" + book?.imageUrl} />
              <Card.Body>
                <Card.Title className='text-success p-1'>{book?.title.slice(0, 30)}</Card.Title>
                <Card.Text>
                  <i>{book.description.slice(0, 110)}</i>
                </Card.Text>
              </Card.Body>
              <div className='mb-2 container'>
                <button onClick={() => handleAddToCart(book?._id, book?.title, book?.price)} className='btn btn-primary w-50'>ADD TO CART</button>
              </div>
            </Card>)
          }
        </div>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </>
  )
}

export default Shop