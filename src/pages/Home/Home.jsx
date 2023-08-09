import React from "react";
import Hero from "./Hero";
import Promo from "./Promo";
import Products from "./Products";
import ShopByBrand from "./ShopByBrand";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Promo></Promo>
      <Products></Products>
      <ShopByBrand></ShopByBrand>
    </div>
  );
};

export default Home;
