/* eslint-disable no-unused-vars */
import React from "react";
import { Parallax, Background } from "react-parallax";
import bgImg from "../../../assets/banner4.png";
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
        <div className="h-[400px] w-full">
          <div className="absolute hero-overlay   top-16 left-16 flex flex-col items-start justify-start">
            {/* <div className="text-5xl text-white uppercase text-center">
              <h1>Title</h1>
            </div> */}
            <img className="w-72" src={logoB} alt="" />
            <h1 className="py-5 text-white text-start">
              Where Every Pawprint Tells <br /> a Tale of Hope and Home.
            </h1>
            <button className="bg-indigo-600 p-2 px-9 rounded-md text-white">
              Donate
            </button>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default CalltoAction;
