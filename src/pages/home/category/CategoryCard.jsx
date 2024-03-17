/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const CategoryCard = ({ cardData }) => {
  return (
    <div>
      <div className="">
        <div className="shadow-md rounded-lg max-w-sm backdrop-blur-xl bg-white/30">
          <div className="flex flex-col justify-center items-center cursor-pointer p-5 ">
            <img
              className="rounded-t-lg lg:w-32 w-20 mx-auto p-2"
              src={cardData?.image_fill}
              alt=""
            />
            <h1 className=" lg:text-2xl text-sm font-normal font-poppins text-white">
              {cardData?.category_name}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
