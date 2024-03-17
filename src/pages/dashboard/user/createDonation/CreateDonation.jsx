/* eslint-disable no-unused-vars */
import React from "react";
import DashBoardHeader from "../../../../components/headers/DashBoardHeader";
import Container from "../../../../components/shared/Container";
import DonationForm from "./DonationForm";

const CreateDonation = () => {
  return (
    <div>
      <Container>
        <div className="bg-slate-100 max-w-4xl mx-auto lg:mt-10 rounded-xl">
          <div className="lg:max-w-4xl mx-auto lg:p-10 p-3">
            <DonationForm />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateDonation;
