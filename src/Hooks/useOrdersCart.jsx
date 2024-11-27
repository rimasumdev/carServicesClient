import { useQuery } from "@tanstack/react-query";
import AuthContext from "../AuthProvider/AuthContext";
import { useContext } from "react";
import axiosInstance from "../AxiosConfig/axios";

const useOrdersCart = () => {
  const { user } = useContext(AuthContext);
  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/orders?email=${user?.email}`);
      return res.data;
    },
  });

  return { orders, isLoading, isError, refetch };
};

export default useOrdersCart;
