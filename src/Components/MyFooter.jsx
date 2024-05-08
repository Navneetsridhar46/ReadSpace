import React from 'react'
import { Link } from 'react-router-dom'

function MyFooter() {
    return (
        <>
           <div style={{backgroundColor:'black'}} className='text-light'>
                <div className='container-fluid justify-content-between p-3' style={{ display: 'flex', height: '300px' }}>
                    <div className='media' style={{ width: '40%' }}>
                        <h5 className='p-1'>READ<span className='fw-bolder text-danger'>SPACE</span><i class="fa-solid fa-book-open-reader ms-1 text-info"></i></h5>
                        <p>Designed and built with love in the world by the Botostrap team with the help of our contributors.</p>
                        <p>Code licensed MIT, docs CC BY 3.0</p>
                        <p>Currently v5.3.2</p>
                    </div>
    
                    <div className='links flex-column d-flex'>
                        <h5 className='p-1'>Company</h5>
                        <Link to={'/shop'} style={{ textDecoration: 'none', color: 'white' }}>Shop</Link>
                        <Link to={'/home'} style={{ textDecoration: 'none', color: 'white' }}>About Us</Link>
                        <Link to={'/watch'} style={{ textDecoration: 'none', color: 'white' }}>Careers</Link>
                    </div>
    
                    <div className='guides d-flex flex-column'>
                        <h5 className='p-1'>Work with us</h5>
                        <a style={{ textDecoration: 'none', color: 'white' }} href="https://www.goodreads.com/author/program" target=''>Authors</a>
                        <a style={{ textDecoration: 'none', color: 'white' }} href="https://www.goodreads.com/advertisers" target=''>Advertise</a>
                        <a style={{ textDecoration: 'none', color: 'white' }} href="https://www.goodreads.com/news?content_type=author_blogs" target=''>Authors & ads blog</a>
                    </div>
    
                    <div className='contact us'>
                        <h5 className='p-1'>Contact us</h5>
                        <div className='d-flex'>
                            <input type="text" className='form-control' placeholder='Enter your email id' />
                            <button className='btn btn-danger ms-2'><i style={{height:'20px'}} class="fa-solid fa-arrow-right"></i></button>
                        </div>
                        <div className='p-2 mt-2' style={{alignItems:'center', justifyContent:'space-between',display:'flex'}}>
                            <a style={{color:'white'}} href="http://"><i style={{height:'100px'}} class="fa-solid fa-message"></i></a>
                            <a style={{color:'white'}} href="http://"><i style={{height:'100px'}} class="fa-brands fa-twitter"></i></a>
                            <a style={{color:'white'}} href="http://"><i style={{height:'100px'}} class="fa-brands fa-linkedin"></i></a>
                            <a style={{color:'white'}} href="http://"><i style={{height:'100px'}} class="fa-brands fa-instagram"></i></a>
                            <a style={{color:'white'}} href="http://"><i style={{height:'100px'}} class="fa-brands fa-github"></i></a>
                            <a style={{color:'white'}} href="http://"><i style={{height:'100px'}} class="fa-brands fa-whatsapp"></i></a>
    
                        </div>
                    </div>
                </div>
                <p className='text-center'> © 2024 ReadSpace, Inc. Built with React</p>
           </div>
        </>
    )
}

export default MyFooter