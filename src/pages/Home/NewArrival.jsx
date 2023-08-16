import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

const NewArrival = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3030/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  //   console.log("SortedData", sortedProducts);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary">New Arrivals</h2>
        <button className="flex gap-2 btn-link font-medium">
          See All{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-7 mt-10">
        {sortedProducts.slice(0, 10).map((item) => (
          <ProductCard key={item._id} item={item}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
