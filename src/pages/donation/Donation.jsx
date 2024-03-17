/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Container from "../../components/shared/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DonationCard from "./DonationCard";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useInView } from "react-intersection-observer";
const Donation = () => {
  const axios = useAxiosPublic();
  const [donation, setDonation] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const lastItemRef = useRef();
  const { ref, inView } = useInView();
  const {
    data: donationData = [],
    refetch,
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useQuery({
    queryKey: ["donationData", page],
    cacheTime: 0,
    staleTime: Infinity,
    queryFn: async ({ pageParam }) => {
      const res = await axios.get(
        `/api/allDonationCamp?page=${page}` + pageParam
      );
      return res.data.result;
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
  });
  // console.log(donationData);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  return (
    <div>
      <Container>
        <div className="lg:mt-56 mt-32 -z-30 h-screen">
          {status === "pending" ? (
            <p>Loading...</p>
          ) : status === "error" ? (
            <span>Error: {error.message}</span>
          ) : (
            <div className="grid lg:grid-cols-3 grid-col gap-5 w-5/6 mx-auto ">
              {donationData?.map((donation, index) => (
                <DonationCard
                  key={donation._id}
                  data={donation}
                  ref={index === donation.length - 1 ? lastItemRef : null}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Donation;
