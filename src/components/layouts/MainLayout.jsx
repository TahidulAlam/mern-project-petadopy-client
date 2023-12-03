/* eslint-disable no-unused-vars */
import React from "react";
// import Navbar from "../headers/Navbar";
import { Outlet } from "react-router-dom";
import NewNab from "../headers/NewNab";
import Footer from "../footers/Footer";
const MainLayout = () => {
  return (
    <div>
      <NewNab />
      {/* <Navbar /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
