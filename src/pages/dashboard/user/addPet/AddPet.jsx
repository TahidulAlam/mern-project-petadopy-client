/* eslint-disable no-unused-vars */
import React from "react";
import Container from "../../../../components/shared/Container";
import MyForm from "./MyForm";
import DashBoardHeader from "../../../../components/headers/DashBoardHeader";
const AddPet = () => {
  return (
    <div>
      {/* <DashBoardHeader content={<h1>Add Pet</h1>} /> */}
      <Container>
        <div className="bg-slate-100 max-w-4xl mx-auto lg:mt-12 mt-5  rounded-xl">
          <div className="lg:max-w-4xl mx-auto lg:p-10 p-3">
            <MyForm />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddPet;
