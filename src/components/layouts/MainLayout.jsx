/* eslint-disable no-unused-vars */
import React from "react";
// import Navbar from "../headers/Navbar";
import { Outlet } from "react-router-dom";
import NewNab from "../headers/NewNab";
const MainLayout = () => {
  return (
    <div>
      <NewNab />
      {/* <Navbar /> */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
