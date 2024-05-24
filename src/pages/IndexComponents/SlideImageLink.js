import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import _ from 'lodash';

import '../../slide.css'

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { useNavigate } from 'react-router-dom';

const SlideImageLink = ({ imageHomeList }) => {
    const navigate = useNavigate();

    const [room, setRoom] = useState([]);


    const handleClick = (item) => {
        navigateToDetailRoom({
            images: item.images
        });
    }

    const navigateToDetailRoom = (data) => {
        try {
            navigate('/detail', { state: { data } });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!_.isEmpty(imageHomeList)) {
            const availableImages = _.filter(imageHomeList, (item) => !_.isEmpty(item.images))
            setRoom(availableImages)
        }
    }, [])

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
                {_.map(room, (item, index) => {
                    return <SwiperSlide>
                        <div style={{ padding: '6px', backgroundColor: '#eabe6c', borderRadius: '2em' }} onClick={() => handleClick(item)}>
                            <img src={item.images[0]} alt="slide_image" />
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    );
};

export default SlideImageLink;