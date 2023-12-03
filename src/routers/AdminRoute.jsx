/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  // const location = useLocation();
  const [isAdmin, isAdminLoading] = useAdmin();
  if (loading && isAdminLoading) {
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
  if (!user && !isAdmin) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
  return children;
};

export default AdminRoute;
