/* eslint-disable no-unused-vars */
import React from "react";
import img from "../../../assets/banner2.png";
const Review = () => {
  return (
    <div>
      <section className="flex items-center py-16 bg-gray-100 font-poppins rounded-lg">
        <div className="justify-center flex-1 max-w-7xl px-4 py-6 mx-auto lg:py-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-6 mb-6 bg-white h-full ">
              <h2 className="mb-6 text-xl font-semibold text-left font-gray-600 dark:text-gray-400">
                Leave a comment
              </h2>
              <form action="" className="">
                <div className="mb-6 ">
                  <input
                    type="text"
                    placeholder="your email"
                    required=""
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border rounded dark:placeholder-gray-500 dark:text-gray-400 dark:border-gray-800  "
                  />
                </div>
                <div className="mb-6 ">
                  <textarea
                    type="message"
                    placeholder="write a comment"
                    required=""
                    className="block w-full px-4 leading-tight text-gray-700 bg-gray-100 border rounded dark:placeholder-gray-500 py-7 dark:text-gray-400 dark:border-gray-800  "
                  ></textarea>
                </div>
                <div className="">
                  <button className="px-4 py-2 text-xs font-medium text-gray-100 bg-blue-500 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-700">
                    Submit comment
                  </button>
                </div>
              </form>
            </div>
            <div>
              <img src={img} alt="" className="h-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Review;
