/* eslint-disable no-unused-vars */
import React from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../../components/shared/Container";
import DashBoardHeader from "../../../../components/headers/DashBoardHeader";

const MyDonation = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const email = user.email;
  const finalData = async () => {
    const url = `/api/mydonation/${email}`;
    const res = await axiosPrivate.get(url);
    return res.data.result;
  };
  const {
    data: myDonationData,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["myDonatorsData"],
    queryFn: finalData,
  });
  console.log(myDonationData);
  return (
    <div>
      <Container>
        <DashBoardHeader content={<h1>My Donation</h1>}></DashBoardHeader>
        <h1>My Donation</h1>
      </Container>
    </div>
  );
};

export default MyDonation;
