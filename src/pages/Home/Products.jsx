import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [gamingProducts, setGamingProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3030/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  //   console.log(products);
  useEffect(() => {
    const gaming = products.filter((product) => product.tag.includes("Gaming"));
    setGamingProducts(gaming);
  }, [products]);

  console.log(gamingProducts);
  const isMobile = window.innerWidth <= 768;
  const slidesPerView = isMobile ? 1 : 4;

  return (
    <div className="my-4 container mx-auto px-4 md:my-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary">Gammer World</h2>
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
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper"
        >
          <div>
            {gamingProducts.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="bg-white p-8">
                  <img
                    className="h-[150px] mx-auto"
                    src={item.images.preview}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Products;