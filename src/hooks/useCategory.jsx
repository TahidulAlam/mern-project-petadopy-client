/* eslint-disable no-unused-vars */
import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useCategory = () => {
  const axios = useAxiosPublic();
  const getData = async () => {
    const url = "/api/category";
    const res = await axios.get(url);
    return res.data;
  };
  const {
    data: categoryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allcategoryData"],
    queryFn: getData,
  });
  return { categoryData, isLoading, error };
};

export default useCategory;
