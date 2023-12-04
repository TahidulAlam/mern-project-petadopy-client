/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const Axios = useAxiosPrivate();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await Axios.get(`/api/users/${user?.email}`);
      return res.data.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
