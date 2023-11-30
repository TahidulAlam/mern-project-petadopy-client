/* eslint-disable no-unused-vars */
import React from "react";
import DashBoardHeader from "../../../../components/headers/DashBoardHeader";
import Container from "../../../../components/shared/Container";
import DonationForm from "./DonationForm";

const CreateDonation = () => {
  return (
    <div>
      <Container>
        <DashBoardHeader content={<h1>Create Your Campaign</h1>} />
        <div className="max-w-3xl mx-auto">
          <DonationForm />
        </div>
      </Container>
    </div>
  );
};

export default CreateDonation;
