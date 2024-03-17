/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Container from "../../components/shared/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PetListingCard from "./PetListingCard";
import { useQuery } from "@tanstack/react-query";

const PetListNew = () => {
  const axios = useAxiosPublic();
  // const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const lastItemRef = useRef();

  const { data: petsData = [], refetch } = useQuery({
    queryKey: ["petsData", page, searchTerm, category],
    cacheTime: 0,
    staleTime: Infinity,
    queryFn: async () => {
      const res = await axios.get(
        `/api/petList?searchTerm=${searchTerm}&category=${category}&page=${page}`
      );
      return res.data.pets;
    },
  });

  const handleCategoryChange = (e) => {
    setPage(1);
    setCategory(e.target.value);
    refetch();
  };

  const handleInfiniteScroll = () => {
    if (
      !loading &&
      page < totalPages &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [handleInfiniteScroll]);
  // console.log(pets);
  return (
    <div>
      <Container>
        <div className="fixed lg:top-16 top-8 left-0 right-0 z-40">
          <div className="rounded-lg lg:mt-7 mt-4 lg:max-w-xl max-w-xs  mx-auto px-2 py-2 backdrop-blur-sm bg-white/50">
            <div className="relative">
              <div className="flex md:flex-row">
                <div className="flex w-4/6">
                  <input
                    name="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="lg:w-80 w-full px-1 lg:h-10 h-8 rounded-lg border-2  focus:outline-none"
                    type="searchTerm"
                    placeholder="searchTerm"
                  />
                  {/* <button
                    type="button"
                    className=" bg-sky-500 text-white rounded-r px-2 md:px-1 py-0 md:py-1"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
                      />
                    </svg>
                  </button> */}
                </div>
                <select
                  id="category"
                  name="category"
                  value={category}
                  className="w-2/6 lg:h-10 h-8 border-2  focus:outline-none  selection:bg-black text-black rounded-lg  py-0 md:py-1 tracking-wider"
                  onChange={handleCategoryChange}
                >
                  <option value="All" defaultValue="">
                    All
                  </option>
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
        <div className="lg:mt-40 mt-28 -z-50 h-screen">
          <div className="grid lg:grid-cols-5 grid-cols-2  gap-2 w-full mx-auto ">
            {petsData?.map((pet, index) => (
              <PetListingCard
                key={pet._id}
                data={pet}
                // ref={index === pets.length - 1 ? lastItemRef : null}
              />
            ))}
          </div>
        </div>
      </Container>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PetListNew;
