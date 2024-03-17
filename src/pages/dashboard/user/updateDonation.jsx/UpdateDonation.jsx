/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import React, { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment";
import DashBoardHeader from "../../../../components/headers/DashBoardHeader";
import Container from "../../../../components/shared/Container";
import { useLoaderData } from "react-router-dom";
import UpdateDonationForm from "./UpdateDonationForm";

const UpdateDonation = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      {/* <DashBoardHeader content={<h1>Update your Campaign</h1>} /> */}
      <Container>
        <div className="max-w-2xl mx-auto">
          <UpdateDonationForm defaultData={data} />
        </div>
      </Container>
    </div>
  );
};

export default UpdateDonation;
