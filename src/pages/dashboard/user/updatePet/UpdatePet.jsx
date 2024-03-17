/* eslint-disable no-unused-vars */
import React from "react";
import Container from "../../../../components/shared/Container";
import DashBoardHeader from "../../../../components/headers/DashBoardHeader";
import { useLoaderData } from "react-router-dom";
import MyFormUpdate from "./MyFormUpdate";

const UpdatePet = () => {
  const data = useLoaderData();
  return (
    <div>
      <Container>
        {/* <DashBoardHeader content={<h1>Update Pet Details</h1>} /> */}
        <div className="max-w-4xl mx-auto ">
          <MyFormUpdate defautltDd={data} />
        </div>
      </Container>
    </div>
  );
};

export default UpdatePet;
