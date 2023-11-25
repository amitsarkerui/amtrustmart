import React from "react";
import useCart from "../../hooks/useCart";

const Checkout = () => {
  const [cart, refetch] = useCart();
  // console.log("Checkout page", cart);
  return (
    <div className="container mx-auto py-36">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-10">
        <div className="col-span-1 bg-white p-5 rounded-lg border drop-shadow-sm">
          <h3 className="text-xl font-medium text-gray-700">Order Summary</h3>
        </div>
        <div className="col-span-4">
          <h3 className="text-xl font-medium text-gray-700">
            Shipping Details
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
