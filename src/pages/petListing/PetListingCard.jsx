/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
const PetListingCard = ({ data }) => {
  return (
    <>
      <Link to={`/petlisting/${data._id}`}>
        <div className="max-w-2xl mx-auto p-2 shadow-md rounded-lg backdrop-blur-xl bg-white/30 ">
          <div className="max-w-sm group ">
            <div className="relative overflow-hidden rounded-lg">
              <img
                className="object-cover rounded-lg group-hover:scale-125 duration-100 ease-in-out w-full h-[100px] lg:h-[200px]"
                src={data?.image_url ? data?.image_url : data?.image_urls[0]}
                // src={data?.image_url}
                alt=""
              />
              <div className="flex justify-between w-[90%] items-center text-white">
                <h1>{data?.name}</h1>
                <h1 className="text-xs">Age: {data?.age}</h1>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-full w-full rounded-lg  bg-gray-900 bg-opacity-0 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-50"></div>
              <div className=" pl-5 absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full drop-shadow-md">
                <Link
                  to={`/petlisting/${data._id}`}
                  className="text-black backdrop-blur-xl bg-white/80 hover:bg-slate-50 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center whitespace-nowrap "
                >
                  Pet details
                  <svg
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PetListingCard;
