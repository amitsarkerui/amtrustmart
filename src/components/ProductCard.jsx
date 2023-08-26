import { Rating } from "@smastrom/react-rating";
import React from "react";

const ProductCard = ({ item }) => {
  return (
    <div className="relative bg-white p-8 flex flex-col">
      <img
        className="h-[150px] mx-auto"
        src={item.images.preview}
        alt={item.productName}
      />
      <Rating
        className="mt-8"
        style={{ maxWidth: 110 }}
        value={item.rating.average}
        readOnly
      />
      <h2 className="text-lg font-semiBold mt-2">{item.productName}</h2>
      <p className="text-xl font-bold mt-3">$ {item.price}</p>
      <div className="flex-grow"></div>
      <button className="mt-8 btn btn-md btn-outline w-full">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
