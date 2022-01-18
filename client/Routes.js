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
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import SingleProduct from "./components/SingleProduct";

const Routes = () => {
  const { isLoggedIn, adminStatus } = useSelector((state) => {
    return {
      isLoggedIn: !!state.auth.id,
      adminStatus: state.auth.adminStatus,
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
      <Route path="/allProducts/:id" component={SingleProduct} />
      <Route path="/home" component={Home} />
      {isLoggedIn ? (
        <Switch>
          {adminStatus && <Route path="/addProduct" component={AddProduct} />}
          {adminStatus && <Route path="/editProduct" component={EditProduct} />}
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
