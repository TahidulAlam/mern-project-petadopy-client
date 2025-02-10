/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ cardData }) => {
  return (
    <div>
      <Link to={"/petlisting"}>
        <div className="shadow-md max-w-sm bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
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
      </Link>
    </div>
  );
};

export default CategoryCard;
