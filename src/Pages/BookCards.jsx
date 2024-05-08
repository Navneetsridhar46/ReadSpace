import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../Pages/BookCards.css';
import useCartStore from '../services/store'; // Adjust the path as needed


// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { addToCart, getUserCartAPI } from '../services/allAPI';



export const BookCards = ({ headline, books }) => {
  console.log(books);
  const { setTotalQuantity } = useCartStore();

  const [cart, setCart] = useState([])

  let toggle = {
    isOn: false,
    toggleSwitch: function() {
        this.isOn = !this.isOn;
    }
};

toggle.toggleSwitch(); // Example usage


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
    fetchCartItems();
  }, [])

const handleAddToCart = async (bookId, bookTitle, bookPrice) => {
    const newCartItem = { productId: bookId, title: bookTitle, price: bookPrice, quantity: 1 }
    setCart([...cart, newCartItem])
    const token = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")).token : ''
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      // api call 
      try {
        const result = await addToCart(newCartItem, reqHeader)
        console.log(result);
        if (result.status == 200) {
          // setCart(result.data)
          setTotalQuantity(result.data.length);
          setTimeout(() => {
            toast.success("Book added to cart")

          }, 400) // Update total quantity in the store
          
        } else {
          toast.warning("ERROR")
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className='container-fluid mb-2 mt-5'>
      <h1 className='fw-bolder text-dark mt-4 text-center'>{headline}</h1>

      {/* cards  */}
      <div className='mt-4'>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {
            books.map(book => <SwiperSlide key={book?._id}>
              <Link style={{ textDecoration: 'none' }} to={`/singleBook/${book?._id}`}>
                <div className='relative'>
                  <img className='p-2' src={"http://localhost:3000"+book?.imageUrl} alt="" />
                  <div style={{ position: 'absolute', top: '10px', right: '12px', backgroundColor: "blue" }}>
                    <i onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(book?._id, book?.title, book?.price);
                    }} class="fa-solid fa-cart-arrow-down text-white p-1 cart"></i>
                  </div>
                </div>
                <div>
                  <h3 style={{ height: "130px" }} className='text-dark p-1'>{book?.title}</h3>
                </div>
                <div>
                  <p className='text-light'>₹{book?.price}/-</p>
                </div>
              </Link>
            </SwiperSlide>)
          }
        </Swiper>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}
