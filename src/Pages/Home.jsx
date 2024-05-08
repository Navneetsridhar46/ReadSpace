import React, { useEffect, useState } from 'react'
// import img1 from '../assets/png6.png'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { googleLogout } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import BannerCard from '../Components/BannerCard';
import BestSellerBooks from '../Components/BestSellerBooks';
import FavBook from '../Components/FavBook';
import PromoBanner from '../Components/PromoBanner';
import OtherBooks from '../Components/OtherBooks';
import Reviews from './Reviews';
import Badge from 'react-bootstrap/Badge';
import useCartStore from '../services/store'; // Adjust the path as needed
import { getUserCartAPI } from '../services/allAPI';


function Home() {

    const [books, setBooks] = useState([]);


    const [user, setUser] = useState('');
    const { totalQuantity } = useCartStore();
    const { setTotalQuantity } = useCartStore();

    const [userName, setUserName] = useState('')

    const navigate = useNavigate()

    const handleSignOut = () => {
        googleLogout();
        localStorage.removeItem("customer")
        setUserName('');
        toast.info("Signout Successfull")
        navigate('/')
    }


    useEffect(() => {
        setUserName(localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")).firstname : '')
        fetchCartItems();
        const userData = JSON.parse(localStorage.getItem("customer"));
        if (userData.role=='admin') {
            const { role } = userData;
            setUser( role );   
        }const userData1 = JSON.parse(localStorage.getItem("customer"));
        if (userData1.role=='user') {
            const { role } = userData1;
            setUser( role );   
        }
    }, [])

 

    async function fetchCartItems() {
        const token = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")).token : ''
        if (token) {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          try {
            const response = await getUserCartAPI(reqHeader)
            if (response.status == 200) {
              setTotalQuantity(response.data.length);
            } else {
              console.error("Error fetching cart items")
            }
          } catch (error) {
            console.error("Error fetching cart items")
          }
        }
    
      }
    return (
        <>
            <header>
            <Navbar style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: 'yellow' }}>
            <Container>
                <Navbar.Brand href="/">READ<span className='fw-bolder text-danger'>SPACE</span><i className="fa-solid fa-book-open-reader ms-1 text-info"></i></Navbar.Brand>
                <Navbar.Toggle />
                <Nav className="ms-auto">
                   {user==='user' && <Nav.Link className='fw-bold text-secondary' href="shop">SHOP<i style={{height:"17px"}} class="fa-solid fa-bag-shopping ms-1 text-dark"></i></Nav.Link>}
                    {user === 'admin' && <Nav.Link className='fw-bolder' href="dashboard">DASHBOARD</Nav.Link>}
                    {/* <Nav.Link href="dashboard">DASHBOARD</Nav.Link> */}
                </Nav>

                <Nav.Link as={Link} to={'/cart'} style={{ textDecoration: 'none', color: 'black' }}>
                    <i style={{ height: '17px', marginLeft: '630px' }} className="fa-solid fa-cart-shopping"></i>Cart
                    <Badge className='ms-1' bg="danger">{totalQuantity}</Badge>
                </Nav.Link>

                <Navbar.Collapse className="justify-content-end">
                    <Button style={{ color: 'white' }} className='btn btn-danger' onClick={handleSignOut} variant="outline-secondary">
                        Sign Out
                        <i style={{ height: "18px" }} className="fa-solid fa-right-from-bracket ms-1"></i>
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            </header>
            <div style={{ height: '40px' }} className="mainDiv  d-flex justify-content-center">
                <h1>Hi, <span className='text-success fw-bolder'>{userName}</span></h1>

            </div>
            <div className="mainDiv  d-flex justify-content-center">
                <img src='' width={'650px'}></img>
            </div>

            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-lg-5'>
                        <h1 style={{ fontSize: '70px', height: "270px" }} className='fw-bolder text-primary text-center'>SHOP <br /><span className='text-danger'>READ</span><br /><span className='text-success'>REPEAT<i style={{height:'71px'}} class="fa-solid fa-repeat ms-1"></i></span></h1>
                        <h4 className='mt-3 p-1' style={{ textAlign: 'justify' }}>Shop for books that captivate your mind and soul. Uncover new stories, learn from experts, and indulge in the pleasure of reading with our handpicked selection.</h4>
                    </div>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-5 d-flex justify-content-center'>
                        <BannerCard />
                    </div>
                </div>
            </div>
            <BestSellerBooks />
            <FavBook />
            <PromoBanner />
            <OtherBooks />
            <Reviews />
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </>
    )
}

export default Home