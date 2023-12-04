import React from "react";
import { Link, useParams } from "react-router-dom";
import paymentImages from "../../assets/payment/payment-done.gif";

const PaymentSuccess = () => {
  const { tran_id: transactionId } = useParams();
  return (
    <div className="mt-36 bg-white">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <img src={paymentImages} alt="" />
          <h3 className="text-2xl font-bold text-center">
            Payment Successfully
          </h3>
          <p className="font-medium pt-4 pb-4">
            Transaction Id is:
            <span className="bg-amber-100 px-2 py-1 rounded-md ">
              {transactionId}
            </span>
          </p>
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

export default PaymentSuccess;
