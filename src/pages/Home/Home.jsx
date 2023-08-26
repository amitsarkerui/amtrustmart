import React, { useContext } from "react";
import Hero from "./Hero";
import Promo from "./Promo";
import Products from "./Products";
import ShopByBrand from "./ShopByBrand";
import Popular from "./Popular";
import ads3 from "../../assets/Promo-add/ads-3.webp";
import ads4 from "../../assets/Promo-add/ads-4.webp";
import NewArrival from "./NewArrival";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Promo></Promo>
      <Products></Products>
      <ShopByBrand></ShopByBrand>
      <Popular></Popular>
      <div className="container mx-auto px-4 my-8 md:my-16">
        <img className="w-full h-[350px] object-cover" src={ads3} alt="" />
      </div>
      <NewArrival></NewArrival>
      <div className="container mx-auto px-4 my-8 md:my-16">
        <img className="w-full h-[200px] object-cover" src={ads4} alt="" />
      </div>
    </div>
  );
};

export default Home;
