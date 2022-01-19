import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
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
import UserList from "./components/UserList";
import Checkout from "./components/Checkout";
import AddUser from "./components/AddUser";
import Success from "./components/Success";

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
      <Route exact path="/signup" component={AddUser} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/success" component={Success} />
      <Route path="/allProducts/:id" component={SingleProduct} />
      <Route path="/home" component={Home} />
      {isLoggedIn ? (
        <Switch>
          {adminStatus && <Route path="/addProduct" component={AddProduct} />}
          {adminStatus && (
            <Route path="/editProduct/" component={EditProduct} />
          )}
          {adminStatus && <Route exact path="/userList" component={UserList} />}
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={AuthForm}></Route>
        </Switch>
      )}
    </div>
  );
};

export default Routes;
