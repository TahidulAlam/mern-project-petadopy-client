/* eslint-disable no-unused-vars */
import React from "react";
import banner from "../../../assets/banner1.png";
import Slider from "../../../components/shared/Slider";

const Banner = () => {
  return (
    <div>
      <div className="relative -z-10">
        <img src={banner} className="max-w-full h-auto" alt="" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 mt-20">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Banner;
