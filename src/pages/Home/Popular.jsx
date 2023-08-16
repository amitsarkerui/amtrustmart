import React, { useEffect, useState } from "react";
import ProductCard2 from "../../components/ProductCard2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const Popular = () => {
  const [product, setProduct] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/products")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);
  useEffect(() => {
    const filteredProduct = product.filter((pd) => pd.isPopular == true);
    setPopular(filteredProduct);
  }, [product]);

  //   console.log("Popular", popular);
  const isMobile = window.innerWidth <= 768;
  const slidesPerView = isMobile ? 1 : 3;
  return (
    <div className="my-4 container mx-auto px-4 md:my-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary">Popular Products</h2>
        <button className="flex gap-2 btn-link font-medium">
          See All{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
      <div className="my-4 md:my-8">
        <Swiper
          slidesPerView={slidesPerView}
          autoplay={{ delay: 2000 }}
          spaceBetween={30}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <div>
            {popular.map((item) => (
              <SwiperSlide key={item?._id}>
                <ProductCard2 key={item._id} item={item}></ProductCard2>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Popular;
