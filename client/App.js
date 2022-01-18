import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import ShoppingCart from "./components/ShoppingCart";

const App = () => {
  return (
    <div>
      <Navbar />
      <ShoppingCart />
      <Routes />
    </div>
  );
};

export default App;
