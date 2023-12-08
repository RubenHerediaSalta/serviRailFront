// @ts-nocheck
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CREATE_ORDER } from "../utils/constants";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const stripePromise = loadStripe("pk_test_51O757HBXxcvHvA6xa2ISRGAR4pQwKJA4CL0qQT6bvX7Z3zjvdoV1hOOx4IfUy11At8cRfvaSjbEZvKhkmYzU0C6x00JjCGOQkg");

function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [cookies] = useCookies();
  const router = useRouter();
  const { gigId } = router.query;

  useEffect(() => {
    const createOrderIntent = async () => {
      try {
        const { data } = await axios.post(
          CREATE_ORDER,
          { gigId },
          {
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          },
        );
        setClientSecret(data.clientSecret)
      } catch (err) {
        console.log(err);
      }
    };
    if (gigId) {
      createOrderIntent()
    };
  }, [gigId]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-[80vh] max-w-full mx-20 flex flex-col gap-10 items-center">
      <h1 className="text-3xl">
        Please complete the payment to place the order.
      </h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Checkout;
