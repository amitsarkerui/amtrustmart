import React from "react";
import brandImage1 from "../../assets/brand-logo/brand-1.webp";
import brandImage2 from "../../assets/brand-logo/brand-2.webp";
import brandImage3 from "../../assets/brand-logo/brand-3.webp";
import brandImage4 from "../../assets/brand-logo/brand-4.webp";
import brandImage5 from "../../assets/brand-logo/brand-5.webp";
import brandImage6 from "../../assets/brand-logo/brand-6.webp";
import brandImage7 from "../../assets/brand-logo/brand-7.webp";
import brandImage8 from "../../assets/brand-logo/brand-8.webp";
import brandImage9 from "../../assets/brand-logo/brand-9.webp";
import brandImage10 from "../../assets/brand-logo/brand-10.webp";
import brandImage11 from "../../assets/brand-logo/brand-11.webp";
import brandImage12 from "../../assets/brand-logo/brand-12.webp";

const ShopByBrand = () => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-secondary">Shop By Top Brand</h2>
      <div className="my-8 grid grid-cols-2 md:grid-cols-6">
        <div className="w-full h-[130px] bg-white border border-gray-100 flex justify-center items-center relative">
          <img src={brandImage2} alt="" />
        </div>
        <div className="w-full h-[130px] bg-white border border-gray-100 flex justify-center items-center relative">
          <img src={brandImage1} alt="" />
        </div>
        <div className="w-full h-[130px] bg-white border border-gray-100 flex justify-center items-center relative">
          <img src={brandImage3} alt="" />
        </div>
        <div className="w-full h-[130px] bg-white border border-gray-100 flex justify-center items-center relative">
          <img src={brandImage4} alt="" />
        </div>
        <div className="w-full h-[130px] bg-white border border-gray-100 flex justify-center items-center relative">
          <img src={brandImage5} alt="" />
        </div>
        <div className="w-full h-[130px] bg-white border border-gray-100 flex justify-center items-center relative">
          <img src={brandImage6} alt="" />
        </div>
        <div className="w-full h-[130px] bg-white border border-gray-100 flex justify-center items-center relative">
          <img src={brandImage7} alt="" />
        </div>
        <div className="w-full h-[130px] bg-white border border-gray-100 flex justify-center items-center relative">
          <img src={brandImage8} alt="" />
        </div>
        <div className="w-full h-[130px] bg-white border border-gray-100 flex justify-center items-center relative">
          <img src={brandImage9} alt="" />
        </div>
        <div className="w-full h-[130px] bg-white border border-gray-100 flex justify-center items-center relative">
          <img src={brandImage10} alt="" />
        </div>
        <div className="w-full h-[130px] bg-white border border-gray-100 flex justify-center items-center relative">
          <img src={brandImage11} alt="" />
        </div>
        <div className="w-full h-[130px] bg-white border border-gray-100 flex justify-center items-center relative">
          <img src={brandImage12} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ShopByBrand;
