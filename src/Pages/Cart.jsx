import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { deleteCartItemAPI, getUserCartAPI, updateCartItemAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {

    const navigate = useNavigate()

    const [cartItems, setCartItems] = useState([])

    const [cartTotal, setCartTotal] = useState(0)

    const [totalProducts, setTotalProducts] = useState(0);


    useEffect(() => {
        fetchCartItems()
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
                    setCartItems(response.data)
                } else {
                    console.error("Error fetching cart items")
                }
            } catch (error) {
                console.error("Error fetching cart items")
            }
        }

    }

    const handleIncrementQuantity = async (itemId, newQuantity) => {
        if (newQuantity === 0) {
            handleDeleteCartItem(itemId)
            setTimeout(() => {
                toast.info("Item removed from cart")
                // navigate('/')
            }, 400);
        } else {
            const token = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")).token : '';
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`,
                };
                try {
                    const response = await updateCartItemAPI(itemId, newQuantity, reqHeader);
                    if (response.status === 200) {
                        // Update the quantity locally in the cartItems state
                        const updatedCartItems = cartItems.map(item =>
                            item._id === itemId ? { ...item, quantity: newQuantity } : item
                        );
                        setCartItems(updatedCartItems);
                    } else {
                        console.error("Error updating cart item quantity");
                    }
                } catch (error) {
                    console.error("Error updating cart item quantity");
                }
            } else {
                console.error("No token found");
            }
        }

    };

    async function handleDeleteCartItem(itemId) {
        const token = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")).token : '';
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            try {
                const response = await deleteCartItemAPI(itemId, reqHeader);
                setTimeout(() => {
                    toast.info("Item removed from cart")
                }, 1000);
                // Assuming deleteCartItemAPI function accepts itemId and reqHeader
                if (response.status === 200) {
                    // Remove the deleted item from the cartItems array
                    const updatedCartItems = cartItems.filter(item => item._id !== itemId);
                    setCartItems(updatedCartItems);

                } else {
                    console.error("Error deleting cart item");
                }
            } catch (error) {
                console.error("Error deleting cart item");
            }
        } else {
            console.error("No token found")
        }
    }

    useEffect(() => {
        if (cartItems?.length > 0) {
            const totalProduct = cartItems.reduce((acc, item) => acc + item.quantity, 0);
            setTotalProducts(totalProduct);
        } else {
            setTotalProducts(0);
        }
    }, [cartItems]);

    useEffect(() => {
        if (cartItems?.length > 0) {
            const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
            setCartTotal(totalPrice);
        } else {
            setCartTotal(0);
        }
    }, [cartItems]);

    const handlePlaceOrder = () => {
        setCartItems([]);
       alert("Thank you for shopping with us !!Have a great day :)");
    };



    return (
        <>
            {cartItems?.length > 0 ?
                <div style={{ height: '600px', backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWo7MRGW5YumaCu3hl7ZJh3VQWc1mD5yiIdd_OdWzbtg&s)' }}>
                    <h2 className='text-center mt-4 p-1'>CART</h2>
                    <div className='float-start'><Link to={'/home'}><button className='btn btn-success mb-5 ms-2'>BACK TO HOME<i style={{ height: '17px' }} class="fa-solid fa-arrow-left ms-1"></i></button></Link></div>
                    <div className='container'>
                        <Table striped bordered hover variant="white">
                            <thead>
                                <tr className='text-center'>
                                    <th>No.</th>
                                    <th>BOOK NAME</th>
                                    <th>PRICE</th>
                                    <th>Quantity</th>
                                    <th>EDIT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems?.map((item, index) => (
                                    <tr className='text-center' key={item?._id}>
                                        <td>{index + 1}</td>
                                        <td>{item?.productId?.title}</td>
                                        <td>{item?.price}</td>
                                        <div className='d-flex justify-content-center'>
                                            <button onClick={() => handleIncrementQuantity(item?._id, item?.quantity - 1)} className='btn fw-bolder'>-</button>
                                            <input value={item?.quantity} style={{ width: '70px' }} className='form-control text-center' type="number" placeholder='0' readOnly />
                                            <button onClick={() => handleIncrementQuantity(item?._id, item?.quantity + 1)} className='btn fw-bolder'>+</button>
                                        </div>
                                        <td>
                                            <button onClick={() => handleDeleteCartItem(item._id)} className='btn btn-danger'>
                                                <i style={{ height: "17px" }} class="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </div>
                    <div className="container text-center">
                        <div className='shadow border rounded p-4 bg-secondary'>
                            <h5 className='p-1'>Total Product: <b className='text-success'>{totalProducts}</b></h5>
                            <h5 className='p-1'>Total Amount: <b className='text-success'>{isNaN(cartTotal) ? "N/A" : `₹${cartTotal}`}</b></h5>

                            <div className='mt-4'>
                                <button onClick={handlePlaceOrder} className='btn btn-success w-25 text-cemter'>Place Order</button>
                                <Link to={'/shop'}><button className='btn btn-warning w-25 ms-5'>Shop More</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div style={{ height: "100vh" }} className='container text-center'>
                    <div className='float-start'><Link to={'/home'}><button className='btn btn-primary mt-2'><i style={{ height: '17px' }} class="fa-solid fa-arrow-left me-1"></i>BACK TO HOMEPAGE</button></Link></div>
                    <img src="https://bakestudio.in/assets/images/cart/empty-cart.gif" alt="emptyCartImage" />
                    <h3 className='mt-3 p-1'>Your Cart is Empty!!</h3>

                </div>
            }
            <ToastContainer containerId='cart-toast' position='top-center' theme='colored' autoClose={3000} />
        </>

    )
}

export default Cart