import React, { useEffect } from 'react';
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { listProductSales } from 'redux/actions/productActions';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

export default function CarouselProductSlider() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const productSalesList = useSelector((state) => state.productSalesList);
  const { salesCategories } = productSalesList;
  useEffect(() => {
    dispatch(listProductSales());
  }, [category, dispatch]);

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {salesCategories?.map((cat) => (
          <SwiperSlide key={cat}>
            <div className="card" key={cat.id}>
              <div className="discount">
                <h3>-{cat.sales}% off!</h3>
              </div>
              <Link to={`/product/${cat._id}`}>
                <img src={cat.image} alt={cat.title} />
              </Link>
              <div className="box">
                <div className="row">
                  <div className="sales-details-price">
                    <h3>{cat.title}</h3>
                    <h5 className="carousel-price">
                      ${parseFloat(cat.price * (cat.sales / 100)).toFixed(2)}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
