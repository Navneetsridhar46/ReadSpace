import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import '../Components/BannerCard.css';
// import required modules
import { EffectCards } from 'swiper/modules';
import book8 from '../assets/book8.png'
import book9 from '../assets/book9.png'
import book10 from '../assets/book10.png'
import book11 from '../assets/book11.png'
import book5 from '../assets/book5.png'
import book6 from '../assets/book6.png'

function BannerCard() {
    return (
        <>
            <div style={{height:'470px',width:'350px'}}>
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper p-4"
                >
                    <SwiperSlide><img src={book11} alt="" /></SwiperSlide>
                    <SwiperSlide><img src={book10} alt="" /></SwiperSlide>
                    <SwiperSlide><img src={book9} alt="" /></SwiperSlide>
                    <SwiperSlide><img src={book6} alt="" /></SwiperSlide>
                    <SwiperSlide><img src={book8} alt="" /></SwiperSlide>
                    <SwiperSlide><img src={book5} alt="" /></SwiperSlide>
                    <SwiperSlide><img src={book6} alt="" /></SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}

export default BannerCard