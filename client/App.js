import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import ShoppingCart from "./components/ShoppingCart";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <ShoppingCart />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
