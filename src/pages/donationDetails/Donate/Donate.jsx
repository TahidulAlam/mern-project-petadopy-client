/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DonateForm from "./DonateForm";
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const Donate = ({ Amountdata, campData }) => {
  // console.log(Amountdata);
  return (
    <div>
      <Elements stripe={stripePromise}>
        <DonateForm Amountdata={Amountdata} campData={campData} />
      </Elements>
    </div>
  );
};

export default Donate;
