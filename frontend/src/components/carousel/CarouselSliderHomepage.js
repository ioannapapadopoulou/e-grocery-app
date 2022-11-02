import React from 'react';
import carousel1 from 'assets/images/carousel1.jpg';
import carousel2 from 'assets/images/carousel2.jpg';
import carousel3 from 'assets/images/carousel3.jpg';
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

function CarouselSlider() {
  return (
    <div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        navigation={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={carousel1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={carousel2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={carousel3} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default CarouselSlider;
