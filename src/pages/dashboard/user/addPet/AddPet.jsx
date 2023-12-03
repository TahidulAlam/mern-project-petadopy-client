/* eslint-disable no-unused-vars */
import React from "react";
import Container from "../../../../components/shared/Container";
import MyForm from "./MyForm";
import DashBoardHeader from "../../../../components/headers/DashBoardHeader";
const AddPet = () => {
  return (
    <div>
      <DashBoardHeader content={<h1>Add Pet</h1>} />
      <Container>
        <div className="bg-slate-50 max-w-4xl mx-auto mt-10 rounded-xl">
          <div className="lg:max-w-4xl mx-auto p-10">
            <MyForm />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddPet;
