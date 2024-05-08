import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { editBooksAPI, getBookAPI } from '../services/allAPI'
import { SERVER_URL } from '../services/server_Url'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import BookValidation from '../LoginValidation/BookValidation';

function EditBooks() {

    const navigate = useNavigate()

    const { id } = useParams(); // Fetch the 'id' parameter from the URL

    const [bookData, setBookData] = useState({})

    const [preview, setPreview] = useState("")

    console.log('ID:', id); // Check if the ID is fetched correctly

    // Define the fetchBookData function
    const fetchBookData = async (id) => {
        try {
            const result = await getBookAPI(id)
            console.log(result);
            if (result.status == 200) {
                setBookData(result.data)
            } else {
                console.log(result.response);
            }
        } catch (err) {
            console.log(err);
        }
        console.log('Fetching book data for ID:', id);
    };

    // Check if 'id' is truthy before calling fetchBookData
    useEffect(() => {
        if (id) {
            fetchBookData(id);
        }
    }, [id]); // Only re-run the effect if 'id' changes


    const handleCancel = () => {
        setBookData({ id: bookData?._id, title: bookData?.title, price: bookData?.price, description: bookData?.description, category: bookData?.category, quantity: bookData?.quantity, imageUrl: "" })
    }


    const handleUpdate = async () => {
        // setErrors(BookValidation(bookDetails))
        const { title, price, description, category, quantity, imageUrl } = bookData
        if (!title || !price || !description || !category || !quantity || !imageUrl) {
            toast.warning("Please fill the form completely!")
        } else {
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("price", price)
            reqBody.append("description", description)
            reqBody.append("category", category)
            reqBody.append("quantity", quantity)
            preview ? reqBody.append("imageUrl", imageUrl) : reqBody.append("imageUrl", bookData?.imageUrl)


            const token = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")).token : ''
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                // api call 
                try {
                    const result = await editBooksAPI(bookData?._id, bookData, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        setBookData(result.data)
                        // setTimeout(() => {
                        //     toast.success("Book updated")
                        //     navigate('/dashboard/manageBooks')
                        // }, 400);
                        navigate('/dashboard/manageBooks')
                        alert("Book update successfully!")
                    } else {
                        console.log(result.response);
                        
                    }
                } catch (err) {
                    console.log(err);
                }
            }


        }
    }



    return (
        <div style={{ border: '2px dotted black' }} className='p-2 shadow'>
            <h2 className='fw-bolder text-center mt-2'>EDIT BOOK DETAILS</h2>
            <div className='d-flex justify-content-center'>
                <label>
                    <input type="file" style={{ display: 'none' }} onChange={e => setBookData({ ...bookData, imageUrl: e.target.files[0] })} />
                    <img style={{ height: '200px' }} className='img-fluid' src={"http://localhost:3000"+bookData?.imageUrl} alt="uploadBookImage" />
                </label>
            </div>

            <div style={{ gap: "20px" }} className='d-flex justify-content-center'>
                <FloatingLabel style={{ width: '30%' }}
                    controlId="floatingTitle"
                    label="Title"
                    className="mb-3 mt-3"
                >
                    <Form.Control type="text" placeholder="Book name" value={bookData.title} onChange={(e) => setBookData({ ...bookData, title: e.target.value })} />
                    {/* {errors.title && <p style={{ color: 'red', fontSize: '13px' }}>{errors.title}</p>} */}
                </FloatingLabel>
                <FloatingLabel style={{ width: '30%' }} controlId="floatingPrice" label="Price" className='mb-3 mt-3'>
                    <Form.Control type="number" placeholder="499" value={bookData.price} onChange={(e) => setBookData({ ...bookData, price: e.target.value })} />
                    {/* {errors.price && <p style={{ color: 'red', fontSize: '13px' }}>{errors.price}</p>} */}
                </FloatingLabel>
            </div>

            <div className='d-flex justify-content-center'>
                <FloatingLabel controlId="floatingTextarea2" label="Book Description">
                    <Form.Control
                        as="textarea"
                        placeholder="Enter Description" value={bookData.description} onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                        style={{ height: '100px', width: "500px" }}
                    />
                    {/* {errors.description && <p style={{ color: 'red', fontSize: '13px' }}>{errors.description}</p>} */}
                </FloatingLabel>
            </div>

            <div style={{ gap: "20px" }} className='d-flex justify-content-center'>
                <FloatingLabel style={{ width: '30%' }} controlId="floatingCategory" label="Works with selects" className='mt-3 mb-3'>
                    <Form.Select value={bookData.category} onChange={(e) => setBookData({ ...bookData, category: e.target.value })} aria-label="Floating label select example">
                        <option>Type</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="History">History</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Biography">Biography</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Children">Children Books</option>
                        <option value="Religion">Religion</option>
                    </Form.Select>
                    {/* {errors.category && <p style={{ color: 'red', fontSize: '13px' }}>{errors.category}</p>} */}
                </FloatingLabel>
                <FloatingLabel style={{ width: '30%' }} controlId="floatingQuantity" label="Quantity" className='mb-3 mt-3'>
                    <Form.Control type="number" placeholder="100" value={bookData.quantity} onChange={(e) => setBookData({ ...bookData, quantity: e.target.value })} />
                    {/* {errors.quantity && <p style={{ color: 'red', fontSize: '13px' }}>{errors.quantity}</p>} */}
                </FloatingLabel>
            </div>

            <div className='d-flex justify-content-center mt-3 mb-3'>
                <button onClick={handleCancel} className='btn btn-danger btn-rounded w-25'>CANCEL</button>
                <button onClick={handleUpdate} className='btn btn-success btn-rounded ms-5 w-25'>UPDATE</button>
            </div>
            <ToastContainer containerId='editbooks-toast-container' position='top-center' theme='colored' autoClose={3000} />
        </div>
    )
}

export default EditBooks