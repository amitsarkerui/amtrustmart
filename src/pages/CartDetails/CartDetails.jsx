import React from "react";
import useProduct from "../../hooks/useProduct";
import useCart from "../../hooks/useCart";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CartDetails = () => {
  const [cart, refetch] = useCart();
  const [axiosSecure] = useAxiosSecure();
  // console.log(cart);
  const handleDecrease = (item) => {
    if (item.qty >= 1) {
      const updatedQty = item.qty - 1;
      const newQty = {
        _id: item._id,
        qty: updatedQty,
      };
      axiosSecure.patch("carts", newQty).then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
        }
      });
    }
  };
  const handleIncrease = (item) => {
    const updatedQty = item.qty + 1;
    const newQty = {
      _id: item._id,
      qty: updatedQty,
    };
    axiosSecure.patch("carts", newQty).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  // Remove Item
  const handleRemove = (id) => {
    Swal.fire({
      title: "Remove item ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F65E01",
      cancelButtonColor: "#303030",
      confirmButtonText: "Yes, Remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        const productId = {
          id: id,
        };
        axiosSecure.delete("carts", { data: productId }).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Removed!", "Your file has been removed.", "success");
          }
        });
      }
    });
  };
  return (
    <div className="py-28">
      <h1 className="my-10 text-center text-3xl font-bold">
        Please Check Cart
      </h1>
      <div className="container mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-32 p-4">
                    <img src={item.images.preview} alt="Iphone 12" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.productName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">
                          Decrease Quantity button
                        </span>
                        <svg
                          className="w-5 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <input
                          type="number"
                          id="first_product"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={item.qty}
                          onChange={(e) => {}}
                          required
                        />
                      </div>
                      <button
                        onClick={() => handleIncrease(item)}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">
                          Increase Quantity button
                        </span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    $ {item.price * item.qty}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
