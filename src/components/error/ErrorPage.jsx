/* eslint-disable no-unused-vars */
import React from "react";

const ErrorPage = () => {
  return (
    <div>
      <section className="bg-blue-100 md:h-screen font-poppins dark:bg-gray-900 ">
        <div className="flex items-center h-screen">
          <div className="justify-center max-w-6xl px-4 mx-auto text-center ">
            <div className="w-full p-8 bg-white rounded-md dark:bg-gray-800">
              <div className="hidden w-full mb-6 xl:block lg:block">
                <img
                  src="https://i.postimg.cc/qqVRfZbf/pexels-tim-gouw-52608.jpg"
                  alt=""
                  className="relative inset-0 object-cover w-full rounded-md h-34 lg:h-64"
                />
              </div>
              <h1 className="inline-block mb-5 font-bold text-gray-700 text-7xl xl:text-9xl lg:text-9xl dark:text-gray-300">
                404
              </h1>
              <h2 className="mb-4 text-2xl font-semibold text-gray-600 lg:text-4xl dark:text-gray-400">
                Oops! Something wents wrong!
              </h2>
              <p className="mb-5 text-xs text-gray-600 dark:text-gray-400">
                Sorry! we are unable to find the page that you are looking
                for...
              </p>
              <div className="flex flex-wrap items-center justify-center">
                <a
                  href="#"
                  className="px-4 py-3 mb-8 mr-0 text-base font-medium text-gray-100 uppercase bg-blue-600 rounded-md hover:bg-blue-800 lg:mb-0 lg:mr-4 md:w-auto"
                >
                  Back to home
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
