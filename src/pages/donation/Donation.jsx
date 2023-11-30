/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Container from "../../components/shared/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DonationCard from "./DonationCard";
const Donation = () => {
  const axios = useAxiosPublic();
  const [donation, setDonation] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const lastItemRef = useRef();

  const getData = async () => {
    try {
      const url = `/api/allDonationCamp?page=${page}`;
      const res = await axios.get(url);
      setDonation((prevDonation) => [...prevDonation, ...res.data.result]);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    }
    // console.log(getData);
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
    getData();
  }, [page]);
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [handleInfiniteScroll]);
  console.log("donate", donation);
  return (
    <div>
      <h1 className="text-xl font-bold">this is Donation page</h1>
      <Container>
        <div className="lg:mt-56 mt-32 -z-30">
          <div className="grid lg:grid-cols-3 grid-col gap-5 w-5/6 mx-auto ">
            {donation?.map((donation, index) => (
              <DonationCard
                key={donation._id}
                data={donation}
                ref={index === donation.length - 1 ? lastItemRef : null}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Donation;
