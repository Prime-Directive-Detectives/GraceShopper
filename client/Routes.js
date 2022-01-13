import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Home from "./components/Home";

import { me } from "./store";
import { useSelector, useDispatch } from "react-redux";
import AllProducts from "./components/AllProducts";
import MaleProducts from "./components/MaleProducts";
import FemaleProducts from "./components/FemaleProducts";
import Accessories from "./components/Accessories";
import SingleProduct from "./components/SingleProduct";
import FeaturedItem from "./components/FeaturedItem";

const Routes = () => {
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: !!state.auth.id,
    };
  });

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
      <Route exact path="/" component={FeaturedItem} />
      <Route path="/allProducts/:productId" component={SingleProduct} />
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login">
            <AuthForm formName="login" />{" "}
          </Route>
          <Route path="/signup">
            <AuthForm formName="signup" />
          </Route>
        </Switch>
      )}
    </div>
  );
};

export default Routes;
