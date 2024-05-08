import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

function SingleBook() {

    const [book, setBook] = useState(null)
    const params = useParams()
    console.log('=====', params.id)

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/product/${params.id}`)
                const data = await response.json()
                setBook(data) //update state with fetched book data 
            } catch (err) {
                console.log(err)
            }
        }
        fetchBookData()

    }, [params])

    return (
        <div style={{backgroundColor:'black'}} className='row'>
            <div className='col-lg-2 d-flex justify-content-center align-items-center'>
                <Link to={'/home'}><button className='btn btn-warning'><i style={{height:'17px'}} class="fa-solid fa-arrow-left me-1"></i>BACK TO HOME<i style={{height:'17px'}} class="fa-solid fa-house-user ms-1"></i></button></Link>
            </div>
           <div className='col-lg-8'>
                <div className='d-flex justify-content-center text-center mt-2'>
                    {
                        book ? (
                            <Card className='shadow p-1' style={{ width: '32rem' }}>
                            <Card.Img style={{height:'270px'}} variant="top" src={"http://localhost:3000"+book?.imageUrl} />
                            <Card.Body>
                              <Card.Title className='fw-bolder p-1'>{book?.title}</Card.Title>
                              <Card.Text className='text-success'>
                                {book.description}
                              </Card.Text>
                              <Card.Text className='text-danger'>
                                Category : {book?.category}
                              </Card.Text>
                              <Card.Text className='text-danger'>
                                 ̥₹{book?.price}/-
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        ):(
                            <p>Loading..</p>
                        )}
                </div>
           </div>
           <div className='col-lg-2 d-flex justify-content-center align-items-center'>
                <Link to={'/shop'}><button className='btn btn-success'><i style={{height:'17px'}} class="fa-solid fa-arrow-right me-1"></i>BOOK SHOP<i style={{height:'17px'}} class="fa-brands fa-shopify ms-1"></i></button></Link>
            </div>
        </div>
    )
}

export default SingleBook