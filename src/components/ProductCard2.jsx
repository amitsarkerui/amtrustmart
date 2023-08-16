import { Rating } from "@smastrom/react-rating";
import React from "react";

const ProductCard2 = ({ item }) => {
  return (
    <div className="bg-white p-10 h-[300px] flex items-center justify-center">
      <div className="flex items-center gap-5">
        <img
          className="h-[150px] w-[150px] object-cover"
          src={item?.images?.preview}
          alt=""
        />
        <div className="">
          <Rating
            className="mt-8"
            style={{ maxWidth: 110 }}
            value={item.rating.average}
            readOnly
          />
          <h2 className="text-lg font-semibold mt-2">{item.productName}</h2>
          <p className="text-xl font-bold mt-3">$ {item.price}</p>

          <button className="mt-4 btn btn-md btn-primary text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
