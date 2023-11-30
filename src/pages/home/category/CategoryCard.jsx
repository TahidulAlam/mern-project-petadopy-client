/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const CategoryCard = ({ cardData }) => {
  return (
    <div>
      <div className="">
        <div className="bg-white shadow-md rounded-lg max-w-sm ">
          <div className="flex flex-col justify-center items-center">
            <img
              className="rounded-t-lg w-44 mx-auto p-10 pb-3"
              src={cardData?.image_draw}
              alt=""
            />
            <h1 className="p-5 text-xl font-semibold">
              {cardData?.category_name}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
