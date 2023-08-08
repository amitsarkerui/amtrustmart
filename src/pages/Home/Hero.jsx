import React from "react";
import banner1 from "../../assets/hero-banner/b1.png";
import banner2 from "../../assets/hero-banner/b2.png";
import banner3 from "../../assets/hero-banner/b3.png";

const Hero = () => {
  return (
    <div className="container mx-auto my-4 px-4 md:my-16">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:h-[600px]">
        <img className=" flex-grow h-full object-cover" src={banner1} alt="" />
        <div className="flex flex-col gap-4 md:gap-8">
          <img src={banner2} alt="" />
          <img src={banner3} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
