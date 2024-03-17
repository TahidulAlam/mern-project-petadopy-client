/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://petadopy-backend.vercel.app",
  // withCredentials: true,
});
const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      console.log(status);
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosPrivate;
