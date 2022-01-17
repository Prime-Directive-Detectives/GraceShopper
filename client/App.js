import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import ShoppingCart from "./components/ShoppingCart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const App = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      <Navbar />
      <ShoppingCart />
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Routes />
        </Elements>
      )}
    </div>
  );
};

export default App;
