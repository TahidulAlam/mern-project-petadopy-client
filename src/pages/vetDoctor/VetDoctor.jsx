/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Container from "../../components/shared/Container";
import { Link } from "react-router-dom";

const VetDoctor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [doctors, setDoctors] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [loading, setLoading] = useState(true);
  const defaultImg = "https://i.ibb.co/FBdRkGZ/doctor-9722572.png";

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnClick = () => {
    setPage(1);
  };

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://chikitsha-hub-server.vercel.app/doctors/search",
          {
            params: {
              page,
              limit,
              searchTerm,
              location,
              category,
            },
          }
        );
        setDoctors(response?.data?.data);
        setTotalPages(response?.data?.totalPages);
        setTotalDoctors(response?.data?.totalDoctors);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching doctors:", error);
        setLoading(false);
      }
    }
    fetchDoctors();
  }, [page, searchTerm, location, category, limit]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <Container>
      <div className="fixed lg:top-16 top-8 left-0 right-0 z-40">
        <div className="lg:mt-7 mt-4 lg:max-w-xl max-w-xs mx-auto px-2 py-2 bg-gray-500 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
          <div className="relative">
            <div className="flex md:flex-row">
              <div className="flex w-4/6">
                <input
                  type="search"
                  placeholder="Search doctors"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={handleOnClick}
                  className="lg:w-80 w-full px-1 lg:h-10 h-8 rounded-lg border-2 focus:outline-none"
                />
              </div>
              <select
                id="category"
                name="category"
                value={category}
                className="w-2/6 lg:h-10 h-8 border-2 focus:outline-none selection:bg-black text-black rounded-lg py-0 md:py-1 tracking-wider"
                onChange={handleCategoryChange}
              >
                <option value="All">All</option>
                <option value="Cat">Cat</option>
                <option value="Dog">Dog</option>
                <option value="Bird">Birds</option>
                <option value="Horse">Horse</option>
                <option value="Fish">Fish</option>
                <option value="Rabbit">Rabbit</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-dots loading-lg "></span>
        </div>
      )}
      {!loading && (
        <div className="z-40 lg:mt-40 mt-5 px-5">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-5 md:gap-3 gap-2 ">
            {doctors?.map((doctor) => (
              <>
                <div className="p-6 border rounded-lg  shadow-xl hover:border-[#409bd4] hover:shadow-2xl h-[230px] bg-white">
                  <div className="flex items-center gap-2 flex-row">
                    <div>
                      <div className="flex items-center gap-6">
                        <div className="avatar">
                          <div className="w-20 rounded-xl">
                            {doctor.img ? (
                              <img src={doctor?.img} />
                            ) : (
                              <span>
                                <img src={defaultImg} alt="" />
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">
                            {doctor?.name}
                          </h4>
                          {/* <p className="text-sm font-semibold text-gray-600">
                            {doctor?.specialties}
                          </p> */}
                        </div>
                      </div>
                      <div className="mt-2">
                        {/* <h4 className="text-sm font-medium text-gray-600">
                          Working on:{" "}
                          <span className="text-sm font-medium text-black">
                            {doctor?.location}
                          </span>
                        </h4> */}
                        {/* <div className="flex md: flex-col lg:flex-row lg:items-center gap-4 mt-2">
                        <h4 className="text-lg font-medium text-gray-600">
                          Experience:{" "}
                          <span className="text-lg font-semibold text-black">
                            {doctor?.experience?.year} + Years
                          </span>
                        </h4>
                      </div> */}
                        <div className="flex gap-1 items-center">
                          <h4 className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            Rating:{" "}
                            <Rating
                              initialRating={doctor?.rating}
                              emptySymbol={
                                <AiOutlineStar className="text-orange-300 w-5 h-5 mt-2" />
                              }
                              fullSymbol={
                                <AiFillStar className="text-orange-300 w-5 h-5 mt-2" />
                              }
                            ></Rating>
                          </h4>
                          <p className="text-sm font-medium text-gray-600">
                            ({doctor?.rating})
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-2xl font-bold">
                            $ {doctor?.fee}{" "}
                            <span className="text-sm font-normal text-gray-600">
                              per consultation
                            </span>
                          </h4>
                          <p className="text-sm font-normal text-gray-600 mt-2">
                            Follow Up: $ {doctor?.followUpFee}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <div className="bg-base-200 px-10 py-16 text-center w-full rounded-lg md:w-fit">
                    <h4 className="text-2xl font-bold">
                      $ {doctor?.fee}{" "}
                      <span className="text-sm font-normal text-gray-600">
                        per <br /> consultation
                      </span>
                    </h4>
                    <p className="text-sm font-normal text-gray-600 mt-4">
                      Follow Up: $ {doctor?.followUpFee}
                    </p>
                  </div> */}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
      <div className="join flex gap-1 max-w-sm mx-auto text-white justify-center items-center mb-5">
        <button
          onClick={handlePrevious}
          className="bg-blue-600 px-4 py-2 text-xl rounded-full"
        >
          {"<"}
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`${
                pageNumber === page
                  ? "bg-blue-700 px-5 py-2 text-xl text-white rounded-full"
                  : " bg-indigo-100 px-5 py-2 text-xl text-blue-950 rounded-full"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          className="bg-blue-600 px-4 py-2 text-xl rounded-full"
        >
          {">"}
        </button>
      </div>
    </Container>
  );
};

export default VetDoctor;
