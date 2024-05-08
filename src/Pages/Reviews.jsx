import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import propic from '../assets/profile.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Avatar } from 'flowbite-react';

function Reviews() {
    return (
        <div className='container mt-4'>
            <h2 className='fw-bold text-center p-1'>Our Customers</h2>
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className='shadow p-2 mt-3' style={{ backgroundColor: 'white', color: "black", border: '1px dotted lightgreen' }}>
                        <div>
                            <div style={{ color: "gold" }}>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div className='mt-2'>
                                <p className='mb-3'>I love this bookstore app! It’s so easy to use, and I can find all the books I want in one place. The search function is great, and I appreciate the recommendations based on my browsing history. Plus, the checkout process is seamless. Highly recommend!</p>
                                <div className='d-flex justify-content-center'><Avatar img={propic} className='rounded mb-4' style={{ width: "15%" }} /></div>
                                <h5 className='p-1'>Mark Ping</h5>
                                <p>CEO, ABC company</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='shadow p-2 mt-3' style={{ backgroundColor: 'white', color: "black",border: '1px dotted lightgreen' }}>
                        <div>
                            <div style={{ color: "gold" }}>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div className='mt-2'>
                                <p className='mb-3'>As an avid reader, I’ve tried several online bookstores, but this one stands out for its wide selection and user-friendly interface. I can easily navigate through genres, discover new authors, and read reviews before making a purchase. The delivery is also prompt</p>
                                <div className='d-flex justify-content-center'><Avatar img={propic} className='rounded mb-4' style={{ width: "15%" }} /></div>
                                <h5 className='p-1'>Mark Ping</h5>
                                <p>CEO, ABC company</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='shadow p-2 mt-3' style={{ backgroundColor: 'white', color: "black",border: '1px dotted lightgreen' }}>
                        <div>
                            <div style={{ color: "gold" }}>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div className='mt-2'>
                                <p className='mb-3'>This bookstore app has become my go-to for all my reading needs. The collection is impressive, from bestsellers to niche titles, and I appreciate the option to buy both physical books and e-books. The community features like book clubs and discussion forums.</p>
                                <div className='d-flex justify-content-center'><Avatar img={propic} className='rounded mb-4' style={{ width: "15%" }} /></div>
                                <h5 className='p-1'>Mark Ping</h5>
                                <p>CEO, ABC company</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='shadow p-2 mt-3' style={{ backgroundColor: 'white', color: "black",border: '1px dotted lightgreen' }}>
                        <div>
                            <div style={{ color: "gold" }}>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div className='mt-2'>
                                <p className='mb-3'>I’ve been using this bookstore app for a while now, and I must say, I’m impressed with the personalized recommendations. The app learns my preferences over time and suggests books that align with my interests. It’s like having my own virtual book.</p>
                                <div className='d-flex justify-content-center'><Avatar img={propic} className='rounded mb-4' style={{ width: "15%" }} /></div>
                                <h5 className='p-1'>Mark Ping</h5>
                                <p>CEO, ABC company</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='shadow p-2 mt-3' style={{ backgroundColor: 'white', color: "black",border: '1px dotted lightgreen' }}>
                        <div>
                            <div style={{ color: "gold" }}>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div className='mt-2'>
                                <p className='mb-3'>I had a fantastic experience shopping on this bookstore app. The interface is clean and intuitive, making it easy to browse through categories and find exactly what I’m looking for. The checkout process is secure, and I appreciate the multiple payment options available.</p>
                                <div className='d-flex justify-content-center'><Avatar img={propic} className='rounded mb-4' style={{ width: "15%" }} /></div>
                                <h5 className='p-1'>Mark Ping</h5>
                                <p>CEO, ABC company</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='shadow p-2 mt-3' style={{ backgroundColor: 'white', color: "black",border: '1px dotted lightgreen' }}>
                        <div>
                            <div style={{ color: "gold" }}>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div className='mt-2'>
                                <p className='mb-3'>I had a fantastic experience shopping on this bookstore app. The interface is clean and intuitive, making it easy to browse through categories and find exactly what I’m looking for. The checkout process is secure, and I appreciate the multiple payment options</p>
                                <div className='d-flex justify-content-center'><Avatar img={propic} className='rounded mb-4' style={{ width: "15%" }} /></div>
                                <h5 className='p-1'>Mark Ping</h5>
                                <p>CEO, ABC company</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='shadow p-2 mt-3' style={{ backgroundColor: 'white', color: "black",border: '1px dotted lightgreen' }}>
                        <div>
                            <div style={{ color: "gold" }}>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star me-2"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div className='mt-2'>
                                <p className='mb-3'>This bookstore app has become my go-to for all my reading needs. The collection is impressive, from bestsellers to niche titles, and I appreciate the option to buy both physical books and e-books. The community features like book clubs and discussion forums.</p>
                                <div className='d-flex justify-content-center'><Avatar img={propic} className='rounded mb-4' style={{ width: "15%" }} /></div>
                                <h5 className='p1'>Mark Ping</h5>
                                <p>CEO, ABC company</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default Reviews