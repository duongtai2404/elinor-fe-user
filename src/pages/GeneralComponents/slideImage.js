import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../../slide.css'

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';

const SlideImage = ({ imageHomeList }) => {

    return (
        <div className="container-slide zoom-slide">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
            >
                {imageHomeList.map((item, index) => {
                    return <SwiperSlide>
                        <div style={{ padding: '6px', backgroundColor: '#dfa974', borderRadius: '2em' }}>
                            <img src={item} alt="slide_image" />
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    );
};

export default SlideImage;