import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AllProducts from "./components/AllProducts";
import MaleProducts from "./components/MaleProducts";
import FemaleProducts from "./components/FemaleProducts";
import Accessories from "./components/Accessories";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import SingleProduct from "./components/SingleProduct";
import UserList from "./components/UserList";
import Checkout from "./components/Checkout";
import AddUser from "./components/AddUser";
import Success from "./components/Success";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Routes = () => {
  const { isLoggedIn, adminStatus, order } = useSelector((state) => {
    return {
      isLoggedIn: !!state.auth.id,
      adminStatus: state.auth.adminStatus,
      order: state.order,
    };
  });

  useEffect(() => {
    let cartTotal = order.products.reduce((total, product) => {
      const qty = order.quantity.find(
        (item) => item.productId === product.id
      )?.quantity;
      return (total += product.price * qty);
    }, 0);
    setCartTotal(cartTotal);
  }, [order.quantity]);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartTotal }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const [cartTotal, setCartTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Route exact path="/allProducts" component={AllProducts} />
      <Route exact path="/maleProducts" component={MaleProducts} />
      <Route exact path="/femaleProducts" component={FemaleProducts} />
      <Route exact path="/accessories" component={Accessories} />
      <Route exact path="/signup" component={AddUser} />
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Route
            exact
            path="/checkout"
            render={() => <Checkout cartTotal={cartTotal} />}
          />
        </Elements>
      )}
      <Route exact path="/success" component={Success} />
      <Route path="/allProducts/:productId" component={SingleProduct} />
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          {adminStatus && <Route path="/addProduct" component={AddProduct} />}
          {adminStatus && (
            <Route path="/editProduct/" component={EditProduct} />
          )}
          {adminStatus && <Route exact path="/userList" component={UserList} />}
        </Switch>
      ) : (
        <Switch>
          <Route path="/login">
            <AuthForm formName="login" />{" "}
          </Route>
          {/* <Route path="/signup">
            <AuthForm formName="signup" />
          </Route> */}
        </Switch>
      )}
    </div>
  );
};

export default Routes;
