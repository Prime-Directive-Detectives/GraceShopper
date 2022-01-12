import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: !!state.auth.id,
    };
  });

  const dispatch = useDispatch();

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/" onClick={() => dispatch(logout())}>
                Sign Out
              </Link>
              <Link to="/">Wish List</Link>
              <Link to="/login">Coupon</Link>
            </div>
            <div>
              <Link to="/home">
                <h1>Clothings R Us</h1>
              </Link>
              <Link to="#">Mens</Link>
              <Link to="#">Womens</Link>
              <Link to="#">Accessories</Link>
              <Link to="#">All Clothing</Link>
            </div>
          </div>
        ) : (
          <div>
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/signup">Sign Up</Link>
              <Link to="/">Sign In</Link>
              <Link to="#">Wish List</Link>
              <Link to="/login">Coupon</Link>
            </div>
            <div>
              <div>
                <Link to="/home">
                  <h1 className="text-3xl font-bold underline ">
                    Clothings R Us
                  </h1>
                </Link>
                <Link to="#">Mens</Link>
                <Link to="#">Womens</Link>
                <Link to="#">Accessories</Link>
                <Link to="#">All Clothing</Link>
              </div>
              <div>
                <button>Cart</button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
