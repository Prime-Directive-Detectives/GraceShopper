import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { useGlobalContext } from "../context";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { isLoggedIn, adminStatus, username } = useSelector((state) => {
    return {
      isLoggedIn: !!state.auth.id,
      adminStatus: state.auth.adminStatus,
      username: state.auth.username,
    };
  });

  const dispatch = useDispatch();

  const { openCart, cartQty, guestCartQty } = useGlobalContext();

  return (
    <nav className="bg-slate-200 shadow-lg">
      {isLoggedIn ? (
        <div className=" mx-auto px-4">
          <div className="flex justify-end">
            <div className="flex space-x-7">
              <div>
                <Link
                  to="/userProfile"
                  className="py-4 px-2 text-red-500 font-semibold hover:text-red-600 transition duration-300"
                >
                  Welcome, {username}
                </Link>
                <Link
                  to="/home"
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-red-500 transition duration-300"
                  onClick={() => dispatch(logout())}
                >
                  Sign out
                </Link>
                {adminStatus && (
                  <Link
                    to="/addProduct"
                    className="py-4 px-2 text-gray-500 font-semibold hover:text-red-500 transition duration-300"
                  >
                    Add Product
                  </Link>
                )}
                {adminStatus && (
                  <Link
                    to="/userList"
                    className="py-4 px-2 text-gray-500 font-semibold hover:text-red-500 transition duration-300"
                  >
                    User List
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="hidden md:flex items-center space-x-1">
                <Link to="/home" className="flex items-center py-4 px-2">
                  {/* <img src="#" alt="Logo" className="h-8 w-8 mr-2" /> */}
                  <span className="font-bold text-red-500 text-lg">
                    Clothes R Us
                  </span>
                </Link>
                <Link
                  to="/maleProducts"
                  className="py-4 px-2 text-gray-900 font-semibold hover:text-red-500 transition duration-300"
                >
                  Men
                </Link>
                <Link
                  to="/femaleProducts"
                  className="py-4 px-2 text-gray-900 font-semibold hover:text-red-500 transition duration-300"
                >
                  Women
                </Link>
                <Link
                  to="/accessories"
                  className="py-4 px-2 text-gray-900 font-semibold hover:text-red-500 transition duration-300"
                >
                  Accessories
                </Link>
                <Link
                  to="/allProducts"
                  className="py-4 px-2 text-gray-900 font-semibold hover:text-red-500 transition duration-300"
                >
                  All Clothing
                </Link>
                <SearchBar placeholder="Search" />
              </div>
              <div>
                <button
                  className="py-4 px-1 relative border-2 border-transparent text-gray-900 rounded-full hover:text-red-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                  aria-label="Cart"
                  onClick={() => openCart()}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <span className="absolute inset-0 object-right-top -mr-6">
                    <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                      {cartQty}
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" mx-auto px-4">
          <div className="flex justify-end">
            <div className="flex space-x-7">
              <div>
                <Link
                  to="/login"
                  className="py-4 px-2 text-gray-900 font-semibold hover:text-red-500 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="py-4 px-2 text-gray-900 font-semibold hover:text-red-500 transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="hidden md:flex items-center space-x-1">
                <Link to="/home" className="flex items-center py-4 px-2">
                  <span className="font-bold text-red-500 text-lg">
                    Clothes R Us
                  </span>
                </Link>
                <Link
                  to="/maleProducts"
                  className="py-4 px-2 text-gray-900 font-semibold hover:text-red-500 transition duration-300"
                >
                  Men
                </Link>
                <Link
                  to="/femaleProducts"
                  className="py-4 px-2 text-gray-900 font-semibold hover:text-red-500 transition duration-300"
                >
                  Women
                </Link>
                <Link
                  to="/accessories"
                  className="py-4 px-2 text-gray-900 font-semibold hover:text-red-500 transition duration-300"
                >
                  Accessories
                </Link>
                <Link
                  to="/allProducts"
                  className="py-4 px-2 text-gray-900 font-semibold hover:text-red-500 transition duration-300"
                >
                  All Clothing
                </Link>
                <SearchBar placeholder="Search" />
              </div>
              <div>
                <button
                  className="py-4 px-1 relative border-2 border-transparent text-gray-900 rounded-full hover:text-red-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                  aria-label="Cart"
                  onClick={() => openCart()}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <span className="absolute inset-0 object-right-top -mr-6">
                    <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                      {guestCartQty ? guestCartQty : 0}
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
