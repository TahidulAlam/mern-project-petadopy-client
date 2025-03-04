/* eslint-disable no-unused-vars */
import React from "react";
import { Parallax, Background } from "react-parallax";
import { Link } from "react-router-dom";
import bgImg from "../../../assets/bgimg111.webp";
import logoB from "../../../assets/petadopyWhite.png";
const CalltoAction = () => {
  return (
    <div className="-z-10">
      <Parallax
        className="rounded-lg"
        blur={{ min: -15, max: 15 }}
        bgImage={bgImg}
        strength={200}
      >
        <div className="lg:h-[400px] h-[200px] w-full ">
          <div className="relative hero-overlay lg:top-16 top-6 flex flex-col items-center justify-center">
            <div className=" bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 flex flex-col justify-center items-center lg:p-5 px-5 py-2">
              <img className="lg:w-96 w-24" src={logoB} alt="" />
              <h1 className="lg:py-5 py-2 text-black text-center lg:text-base text-sm">
                Where Every Pawprint Tells <br /> a Tale of Hope and Home.
              </h1>
              <Link to={"/donation"}>
                <button className="bg-white rounded-lg p-2 lg:px-9 px-3 text-black z-50 lg:text-base text-sm">
                  Donate
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default CalltoAction;
