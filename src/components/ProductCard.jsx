import { Rating } from "@smastrom/react-rating";
import React, { useContext, useEffect, useState } from "react";
import { AuthContextProvider } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";
import "../components/style.css";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  // console.log("from products", item);
  const { user } = useContext(AuthContextProvider);
  const [quantity, setQuantity] = useState(true);
  const [axiosSecure] = useAxiosSecure();
  const [cart, refetch] = useCart();
  useEffect(() => {
    if (item.quantityInStock <= 0) {
      setQuantity(false);
    }
  }, [item.quantityInStock]);
  // Sweet alert
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // Add to cart function
  const handleAddToCart = (item) => {
    // console.log(item);
    if (user && user.email) {
      const clickedProduct = {
        product_id: item?._id,
        productName: item?.productName,
        price: item?.price,
        qty: 1,
        rating: item?.rating,
        images: item?.images,
        brand: item?.brand,
        email: user?.email,
      };
      if (item.quantityInStock > 0) {
        axiosSecure
          .post("carts", clickedProduct)
          .then((res) => {
            if (res.data.insertedId) {
              refetch();
              Toast.fire({
                icon: "success",
                title: "Added in the cart",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  // Check product in cart
  const isInCart =
    Array.isArray(cart) &&
    cart.find &&
    cart.find((singleItem) => singleItem?.product_id === item?._id);
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
      {isInCart ? (
        <>
          <Link to={"/cartDetails"}>
            <button className="mt-8 btn btn-md btn-outline btn-primary  w-full btn-added">
              <span className="button-text text-primary">Added</span>
            </button>
          </Link>
        </>
      ) : (
        <>
          {quantity ? (
            <button
              onClick={() => handleAddToCart(item)}
              className="mt-8 btn btn-md btn-outline w-full"
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="mt-8 btn btn-md btn-outline w-full border border-red-500 "
              disabled
            >
              Out of stock
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCard;
