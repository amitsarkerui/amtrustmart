import React from "react";
import paymentImages from "../../assets/payment/payment-faild.webp";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="mt-36 bg-[#FEFCFB]">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <img className="w-[500px]" src={paymentImages} alt="" />
          <h3 className="text-2xl font-bold text-center">Something Wrong</h3>
          <p className="font-medium pt-1">Please try again after few minutes</p>
          <Link to={"/"}>
            <button className="btn btn-primary text-white mt-7 mb-24">
              Shop More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
