import React from 'react'
import favBook from '../assets/favBook.jpg'
import { Link } from 'react-router-dom'

function FavBook() {
    return (
       <div className='container mt-5'>
            <div className='row'>
                <div className='col-lg-6 mb-3'>
                    <div className='container-fluid'>
                        <img style={{ width: "100%"}} className='rounded shadow' src={favBook} alt="" />
                    </div>
                    </div>
           
                    <div className='col-lg-6 text-center'>
                        <div className='mt-5 container'>
                            <h2 className='fw-bolder p-1' style={{ fontSize: '40px' }}>Find Your Favourite <span className='text-primary fw-bolder'>Books Here!</span></h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem eum eaque nam expedita. Molestias dolores rerum similique quibusdam qui iure commodi! Atque tenetur magni asperiores ut libero repellat, ipsam placeat.</p>
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='container'>
                                <h3 className='fw-bolder p-1'>800+</h3>
                                <p className='fw-bold'>Book Listing</p>
                            </div>
                            <div className='container'>
                                <h3 className='fw-bolder p-1'>550+</h3>
                                <p className='fw-bold'>Registered Users</p>
                            </div>
                            <div className='container'>
                                <h3 className='fw-bolder p-1'>1200+</h3>
                                <p className='fw-bold'>PDF Downloads</p>
                            </div>                               
                        </div>
                        <Link to={'/shop'}><button className='btn btn-primary btn-rounded fw-bold mt-2'>EXPLORE MORE</button></Link>
                    </div>
            </div>
       </div>
    )
}

export default FavBook