/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
const DonateForm = ({ Amountdata, campData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [transectionId, setTransectionId] = useState("");
  const axios = useAxiosPrivate();
  const { user } = useAuth();
  console.log(Amountdata);
  const Axios = useAxiosPrivate();
  console.log(campData);
  useEffect(() => {
    if (Amountdata > 0) {
      Axios.post("/api/create-donate-intent", { amount: Amountdata }).then(
        (res) => setClientSecret(res.data.clientSecret)
      );
    }
  }, [Axios, Amountdata]);

  const handleSubmit = async (e) => {
    console.log("card");
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    const { paymentIntent, error: cardConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "annonymus",
            name: user.displayName || "annonymus",
          },
        },
      });
    if (cardConfirmError) {
      // setMessage(error.message);
      console.log("confirm error");
    } else {
      // setMessage("An unexpected error occurred.");
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        Swal.fire("Donate Successful");
        setTransectionId(paymentIntent.id);
        const donateDetails = {
          name: user.displayName,
          email: user?.email,
          Amount: Amountdata,
          data: new Date(),
          transectionId: paymentIntent.id,
          campIds: campData._id,
          campIdsEmail: campData.email,
          campIdsName: campData.name,
          status: "pending",
        };
        const res = Axios.post("/api/donates", donateDetails);
        console.log("Donate api :", res);
        // Navigate("/dashboard/paymentHistory");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-blue-100
                                        hover:text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          type="submit"
          disabled={!stripe || !clientSecret}
          // disabled={!stripe}
        >
          Donate
        </button>
      </form>
    </div>
  );
};

export default DonateForm;
// 1amAdmin@mail.com
