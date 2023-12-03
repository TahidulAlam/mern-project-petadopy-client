/* eslint-disable no-unused-vars */
// /* eslint-disable react/jsx-no-undef */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// // /* eslint-disable no-unused-vars */
// // // /* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
// // import usePetDetails from "../../hooks/usePetDetails";
import Container from "../../components/shared/Container";
import PetListingCard from "./PetListingCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const PetListing = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");
  const [searchData, setSearchData] = useState();
  const axios = useAxiosPublic();
  // const keywordRef = useRef(null);
  const formRef = useRef(null);
  const getData = async (page = 1) => {
    // if (!keyword && category === "All") {
    if (category === "All") {
      const url = `/api/petList`;
      const { data } = await axios.get(url);
      return data.products;
    } else {
      // const url = `/api/petList?search=${keyword}&category=${category}`;
      const url = `/api/petList?category=${category}&page=${page}`;
      const { data } = await axios.get(url);
      return data.products;
    }
    // let url;

    // if (category === "All") {
    //   url = `/api/petList?page=${page}`;
    // } else {
    //   url = `/api/petList?category=${category}&page=${page}`;
    // }
  };

  const query = {
    queryKey: ["allpetData"],
    queryFn: getData,
    staleTime: 60000,
  };

  const { data: petData, isLoading, error, refetch } = useQuery(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setKeyword(keyword);

    if (keyword) {
      const filteredData = petData.filter((item) =>
        item.name.toLowerCase().includes(keyword)
      );
      setSearchData(filteredData);
    } else {
      setSearchData(petData);
    }
  };
  console.log(petData);
  useEffect(() => {
    setSearchData(petData);
  }, [petData]);
  console.log(petData);
  return (
    <div>
      <Container>
        <div className="fixed top-0 left-0 right-0 z-10">
          <div className="rounded-b-xl lg:mt-5 mt-1 max-w-xl mx-auto px-5 py-4 bg-[#6D28D9]">
            <div className="relative">
              <form
                // ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-3"
              >
                <div className="flex">
                  <input
                    // ref={keywordRef}
                    value={keyword}
                    onChange={handleSearch}
                    className="w-full md:w-80 px-3 h-10 rounded-l border-2  focus:outline-none"
                    type="search"
                    placeholder="Search"
                  />
                  <button className=" bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1">
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
                  </button>
                </div>
                <select
                  id="pricingType"
                  name="pricingType"
                  className="w-full h-10 border-2  focus:outline-none  text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
                  onChange={(e) => setCategory(e.target.value)}
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
              </form>
            </div>
          </div>
        </div>
        <div className="lg:mt-44 -z-30">
          <div className="grid grid-cols-3 gap-5 w-5/6 mx-auto ">
            {searchData
              ? searchData?.map((dd) => (
                  <PetListingCard key={dd._id} data={dd}></PetListingCard>
                ))
              : petData?.map((dd) => (
                  <PetListingCard key={dd._id} data={dd}></PetListingCard>
                ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PetListing;

{
  /* <>///////////////////</> */
}
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// // /* eslint-disable no-unused-vars */
