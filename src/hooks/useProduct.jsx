import React, { useContext } from "react";
import { AuthContextProvider } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useProduct = () => {
  const { user, loading } = useContext(AuthContextProvider);
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: product = [] } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      const res = await axiosSecure("/products");
      return res.data;
    },
  });
  return [product, refetch];
};

export default useProduct;
