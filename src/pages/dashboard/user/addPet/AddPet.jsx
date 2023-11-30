/* eslint-disable no-unused-vars */
import React from "react";
import Container from "../../../../components/shared/Container";
import MyForm from "./MyForm";
const AddPet = () => {
  return (
    <div>
      <Container>
        <h1>Add Pet</h1>
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
