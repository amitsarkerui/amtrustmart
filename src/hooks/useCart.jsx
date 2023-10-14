import React, { useContext } from "react";
import { AuthContextProvider } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user, loading } = useContext(AuthContextProvider);
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["userCart"],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure(`/carts?email=${user?.email}`);
      console.log("res cart", res);
      return res.data;
    },
  });
  return [cart, refetch];
};

export default useCart;
