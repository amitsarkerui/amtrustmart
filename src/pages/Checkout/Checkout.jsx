import React, { useContext, useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContextProvider } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import loveImg from "../../assets/Cart/love.gif";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, refetch] = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [allSubDistricts, setAllSubDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [pay, setPay] = useState("cash");
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContextProvider);
  const navigate = useNavigate();

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const newTotalPrice = cart.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  useEffect(() => {
    const newTotalQty = cart.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);
    setTotalQty(newTotalQty);
  }, [cart]);

  // fetch districts
  useEffect(() => {
    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => setDistrictOptions(data.districts));
  }, []);

  // fetch sub-districts
  useEffect(() => {
    fetch("upazila.json")
      .then((res) => res.json())
      .then((data) => setAllSubDistricts(data.upazilas));
  }, []);

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);
    const selectedDistrictId = districtOptions.find(
      (district) => district.name === selectedDistrict
    );
    const filteredSubDistricts = allSubDistricts.filter(
      (subDistrict) => subDistrict.district_id === selectedDistrictId.id
    );
    // console.log(filteredSubDistricts);
    setSubDistricts(filteredSubDistricts);
  };

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);

    if (pay === "cash") {
      const orderedDetails = {
        userEmail: user?.email,
        userName: user?.displayName,
        productDetails: cart,
        amount: totalPrice + (totalPrice * 15) / 100,
        address1: data?.addressLine1,
        address2: data?.addressLine2,
        district: data?.district,
        upaZila: data?.subDistrict,
        mobile: data?.mobile,
        contactEmail: data?.email,
        status: "processing",
        paymentMethod: "cash",
        paymentStatus: "notPaid",
      };
      axiosSecure
        .post("/orders", orderedDetails)
        .then((res) => {
          if (res.data.insertedId) {
            axiosSecure.delete(`/deleteUserCart/${user.email}`).then((res) => {
              if (res.data.deletedCount > 0) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your Order has been place successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                refetch();
                navigate("/");
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (pay === "payNow") {
      const orderedDetails = {
        userEmail: user?.email,
        userName: user?.displayName,
        productDetails: cart,
        amount: totalPrice + (totalPrice * 15) / 100,
        address1: data?.addressLine1,
        address2: data?.addressLine2,
        district: data?.district,
        upaZila: data?.subDistrict,
        mobile: data?.mobile,
        contactEmail: data?.email,
        status: "processing",
        paymentMethod: "payNow",
        paymentStatus: "notPaid",
      };
      axiosSecure
        .post("/payment", orderedDetails)
        .then((res) => {
          // console.log(res);
          window.location.replace(res.data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container mx-auto py-36">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mt-10 px-4">
        <div className="md:col-span-2 bg-white p-7 rounded-lg border drop-shadow-sm">
          <h3 className="text-xl font-medium text-gray-700">Order Summary</h3>
          <div className="relative overflow-x-auto mt-7">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-s-lg">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-e-lg">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id} className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.productName}
                    </th>
                    <td className="px-6 py-4">{item.qty}</td>
                    <td className="px-6 py-4">${item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">
                  Sub-Total
                </th>
                <td className="px-6 py-3">{totalQty}</td>
                <td className="px-6 py-3">${totalPrice}</td>
              </tr>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-1 text-base">
                  VAT (15%) :
                </th>
                <td className="px-6 py-1"></td>
                <td className="px-6 py-1 ">
                  ${Math.floor((totalPrice * 15) / 100)}
                </td>
              </tr>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-1 text-base">
                  Total :
                </th>
                <td className="px-6 py-1"></td>
                <td className="px-6 py-1 font-bold">
                  ${Math.floor((totalPrice * 15) / 100) + totalPrice}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="md:col-span-4">
          <h3 className="text-xl font-medium text-gray-700">
            Shipping Details
          </h3>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-10 mb-2">
                {/* Address line 1 */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address Line 1*
                  </label>
                  <input
                    type="text"
                    id="address1"
                    {...register("addressLine1", { required: true })}
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    placeholder="3rd floor, left side, dhaka cantonment"
                  />
                  {errors.addressLine1?.type === "required" && (
                    <p
                      id="helper-text-explanation"
                      className="mt-2 text-sm text-red-600 dark:text-gray-400"
                    >
                      Please enter your address
                    </p>
                  )}
                </div>
                {/* Address Line 2 */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="address1"
                    {...register("addressLine2")}
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    placeholder="3rd floor, left side, dhaka cantonment"
                  />
                </div>
                {/* Districts */}
                <div>
                  <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select District*
                  </label>
                  <select
                    id="district"
                    {...register("district", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    onChange={handleDistrictChange}
                    value={selectedDistrict}
                  >
                    <option value="">Select...</option>
                    {districtOptions.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {errors.district?.type === "required" && (
                    <p
                      id="helper-text-explanation"
                      className="mt-2 text-sm text-red-600 dark:text-gray-400"
                    >
                      Please select your district
                    </p>
                  )}
                </div>
                {/* Sub-District */}
                <div>
                  <label
                    htmlFor="subDistrict"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Upazila*
                  </label>
                  <select
                    id="subDistrict"
                    {...register("subDistrict", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  >
                    <option value="">Select...</option>
                    {subDistricts.map((subDistrict) => (
                      <option key={subDistrict.id} value={subDistrict.name}>
                        {subDistrict.name}
                      </option>
                    ))}
                  </select>
                  {errors.district?.type === "required" && (
                    <p
                      id="helper-text-explanation"
                      className="mt-2 text-sm text-red-600 dark:text-gray-400"
                    >
                      Please select your Upazila
                    </p>
                  )}
                </div>
                {/* Mobile No */}
                <div>
                  <label
                    htmlFor="mobile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mobile Number*
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    {...register("mobile", { required: true })}
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    placeholder="017XXXX3804"
                  />
                  {errors.mobile?.type === "required" && (
                    <p
                      id="helper-text-explanation"
                      className="mt-2 text-sm text-red-600 dark:text-gray-400"
                    >
                      Your contact number is needed
                    </p>
                  )}
                </div>
                {/* Email No */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="mobile"
                    {...register("email")}
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    placeholder="name@email.com"
                  />
                </div>
                {/* Radio */}
                <div>
                  <legend className="sr-only">Payment Method</legend>

                  <div className="flex items-center mb-4">
                    <input
                      // {...register("cash")}
                      id="cash-on-delivery"
                      type="radio"
                      name="payment-method"
                      value="cash"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 dark:focus:bg-orange-600 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => setPay(e.target.value)}
                      defaultChecked
                    />
                    <label
                      htmlFor="cash-on-delivery"
                      className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Cash on delivery
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      // {...register("payNow")}
                      id="pay-now"
                      type="radio"
                      name="payment-method"
                      value="payNow"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 dark:focus:bg-orange-600 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => setPay(e.target.value)}
                    />
                    <label
                      htmlFor="pay-now"
                      className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Pay Now
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary text-white mt-4">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
