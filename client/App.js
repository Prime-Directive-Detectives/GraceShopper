import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import ShoppingCart from "./components/ShoppingCart";
import Footer from "./components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

let stripePromise;
(async () => {
  const { publishableKey } = await fetch("/config").then((r) => r.json());
  stripePromise = loadStripe(publishableKey);
})();

const App = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 50 }),
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
      <Footer />
    </div>
  );
};

export default App;
