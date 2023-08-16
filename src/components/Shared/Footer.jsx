import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/logo/amtrustmart.png";
import payWith from "../../assets/Pay with/SSLCommerz-Pay-With-logo-All-Size-01.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container mx-auto px-4">
      <img className="mx-auto w-[250px]" src={logo} alt="" />
      <hr className="my-10" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
        <div>
          <h3 className="text-lg font-medium mb-7">About Us</h3>
          <p className="text-gray-500 max-w-[220px]">
            Discover innovation with amTrustMart - your premier destination for
            top-tier technology products.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-7">Feature</h3>
          <Link className="text-gray-500 mb-3 block">About Us</Link>
          <Link className="text-gray-500 mb-3 block">Flash Sale</Link>
          <Link className="text-gray-500 mb-3 block">Best Product</Link>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-7">General Link</h3>
          <Link className="text-gray-500 mb-3 block">Blog</Link>
          <Link className="text-gray-500 mb-3 block">Tracking Order</Link>
          <Link className="text-gray-500 mb-3 block">Became a seller</Link>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-7">Helpful</h3>
          <Link className="text-gray-500 mb-3 block">FAQ</Link>
          <Link className="text-gray-500 mb-3 block">Support</Link>
          <Link className="text-gray-500 mb-3 block">T&C</Link>
        </div>
      </div>
      <hr className="my-10" />
      <div className="flex justify-between items-center pb-10">
        <div className=" flex gap-6 items-center">
          <span className="text-gray-500 flex gap-3">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
            <FaYoutube />
          </span>
          <p className="text-gray-500">
            ©2023 - Amit Sarker - All rights reserved
          </p>
        </div>
        <div>
          <img className="w-[650px]" src={payWith} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
