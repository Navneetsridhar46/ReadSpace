import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import uploadImg from '../assets/uploadimage2.png'
import { addBookAPI } from '../services/allAPI';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookValidation from '../LoginValidation/BookValidation';
import { useNavigate } from 'react-router-dom';

function UploadBook() {

  const navigate = useNavigate()

  const [errors, setErrors] = useState({})

  const [preview, setPreview] = useState("")

  const [imageFileStatus, setImageFileStatus] = useState(false)

  const [bookDetails, setBookDetails] = useState({
    title: "", price: "", description: "", category: "", quantity: "", bookImage: ""
  })

  const handleCancel = () => {
    setBookDetails({ title: "", price: "", description: "", category: "", quantity: "", bookImage: "" })
  }

  useEffect(() => {
    if (bookDetails.bookImage.type == "image/png" || bookDetails.bookImage.type == "image/jpg" || bookDetails.bookImage.type == "image/jpeg") {
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(bookDetails.bookImage))
    } else {
      setPreview(uploadImg)
      setImageFileStatus(false)
      setBookDetails({ ...bookDetails, bookImage: "" })
    }
  }, [bookDetails.bookImage])



  const handleUpload = async () => {
    setErrors(BookValidation(bookDetails))
    const { title, price, description, category, quantity, bookImage } = bookDetails
    if (!title || !price || !description || !category || !quantity || !bookImage) {
      toast.warning("Please fill the form completely!")
    } else {
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("price", price)
      reqBody.append("description", description)
      reqBody.append("category", category)
      reqBody.append("quantity", quantity)
      reqBody.append("image", bookImage)

      const token = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")).token : ''
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        // api call 
        try {
          const result = await addBookAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            alert("Book added successfully!")
            navigate('/dashboard/manageBooks')
            handleCancel()
          } else {
            alert("Invalid Book details")
          }
        } catch (err) {
          console.log(err);
        }
      }


    }
  }

  return (
    <div style={{border:'2px dotted black'}} className='p-2 shadow'>
      <h2 className='fw-bolder text-center mt-2 p-1'>UPLOAD BOOK</h2>
      <div className='d-flex justify-content-center'>
        <label>
          <input type="file" style={{ display: 'none' }} onChange={e => setBookDetails({ ...bookDetails, bookImage: e.target.files[0] })} />
          <img style={{ height: '200px' }} className='img-fluid' src={preview} alt="uploadBookImage" />
        </label>
        {!imageFileStatus && <div className='text-danger my-2'>*Upload only following file types (png,jpg,jpeg) here!!!</div>}
      </div>

      <div style={{ gap: "20px" }} className='d-flex justify-content-center'>
        <FloatingLabel style={{ width: '30%' }}
          controlId="floatingTitle"
          label="Title"
          className="mb-3 mt-5"
        >
          <Form.Control type="text" placeholder="Book name" value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} />
          {errors.title && <p style={{ color: 'red', fontSize: '13px' }}>{errors.title}</p>}
        </FloatingLabel>
        <FloatingLabel style={{ width: '30%' }} controlId="floatingPrice" label="Price" className='mb-3 mt-5'>
          <Form.Control type="number" placeholder="499" value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} />
          {errors.price && <p style={{ color: 'red', fontSize: '13px' }}>{errors.price}</p>}
        </FloatingLabel>
      </div>

      <div className='d-flex justify-content-center'>
        <FloatingLabel controlId="floatingTextarea2" label="Book Description">
          <Form.Control
            as="textarea"
            placeholder="Enter Description" value={bookDetails.description} onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })}
            style={{ height: '100px', width: "500px" }}
          />
          {errors.description && <p style={{ color: 'red', fontSize: '13px' }}>{errors.description}</p>}
        </FloatingLabel>
      </div>

      <div style={{ gap: "20px" }} className='d-flex justify-content-center'>
        <FloatingLabel style={{ width: '30%' }} controlId="floatingCategory" label="Works with selects" className='mt-3 mb-3'>
          <Form.Select value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} aria-label="Floating label select example">
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
          {errors.category && <p style={{ color: 'red', fontSize: '13px' }}>{errors.category}</p>}
        </FloatingLabel>
        <FloatingLabel style={{ width: '30%' }} controlId="floatingQuantity" label="Quantity" className='mb-3 mt-3'>
          <Form.Control type="number" placeholder="100" value={bookDetails.quantity} onChange={(e) => setBookDetails({ ...bookDetails, quantity: e.target.value })} />
          {/* {errors.quantity && <p style={{ color: 'red', fontSize: '13px' }}>{errors.quantity}</p>} */}
        </FloatingLabel>
      </div>

      <div className='d-flex justify-content-center mt-3 mb-3'>
        <button onClick={handleCancel} className='btn btn-danger btn-rounded w-25'>CANCEL</button>
        <button onClick={handleUpload} className='btn btn-success btn-rounded ms-5 w-25'>UPLOAD</button>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  )
}

export default UploadBook