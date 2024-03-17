/* eslint-disable no-unused-vars */
import React from "react";
import banner from "../../../assets/banner12345.png";
import bannerSm from "../../../assets/bannerSm.png";
import Slider from "../../../components/shared/Slider";

const Banner = () => {
  return (
    <div className="lg:pt-28 pt-20 ">
      <div
        className="relative rounded-[36px] "
        style={{
          background:
            "linear-gradient(90deg, hsla(328, 75%, 45%, 0.2) 0%, hsla(269, 85%, 41%, 0.2) 100%)",
          backgroundSize: "cover",
        }}
      >
        <img
          src={banner}
          className="max-w-full h-auto lg:block hidden"
          alt=""
        />
        <img
          src={bannerSm}
          className="max-w-full h-auto block lg:hidden"
          alt=""
        />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:mt-20 mt-10 lg:block hidden">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Banner;
