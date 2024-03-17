/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://petadopy-backend.vercel.app",
  // withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosInstance;
};

export default useAxiosPublic;
