/* eslint-disable no-unused-vars */
import React from "react";
// import Navbar from "../headers/Navbar";
import { Outlet } from "react-router-dom";
import NewNab from "../headers/NewNab";
import Footer from "../footers/Footer";
import "./layout.css";
import bgImg from "../../assets/lovely-new-image.jpg";
const MainLayout = () => {
  return (
    //
    <div
      className="font-poppins -mt-28 gradient-background"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundColor: "#0e003f",
        // background:
        //   "linear-gradient(90deg, hsla(328, 75%, 45%, 1) 0%, hsla(269, 85%, 41%, 1) 100%)",
        // backgroundSize: "cover",
        // backgroundSize: "contain",
        // width: "100%",
        backgroundPosition: "center",
        position: "relative",
        height: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span> */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // backgroundColor: "rgba(0, 0, 0, 0.7)",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        }}
      ></div>

      <div className="font-poppins relative z-50">
        <NewNab />
        <div className="pt-28">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
    // <>
    //   <div className="font-poppins">
    //     <NewNab />
    //     <div>
    //       <Outlet />
    //     </div>
    //     <Footer />
    //   </div>
    // </>
  );
};

export default MainLayout;
