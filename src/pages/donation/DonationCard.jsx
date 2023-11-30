/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const DonationCard = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md border-gray-200 rounded-lg max-w-sm ">
          <img
            className="rounded-t-lg w-2/4 mx-auto"
            src={data?.image}
            alt=""
          />
          <div className="p-5">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
              Name : {data?.name}
            </h5>
            <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
              Donation Amount : {data?.amount}
            </p>
            <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
              Maximum Donation Amount : 100$
            </p>
            <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
              Last Date: {data?.last_date}
            </p>
            <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
              Location : {data?.location}
            </p>
            <Link
              to={`/donation/${data._id}`}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Campaign details
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
  );
};

export default DonationCard;
