/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import useAuth from "../hooks/useAuth";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <TailSpin
          height="80"
          width="80"
          color="#3DB6F0"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  if (!user?.email) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
