import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserThunk } from "../store/singleUser";
import { useHistory } from "react-router-dom";

const AddUser = () => {
  let history = useHistory();

  const { singleUser } = useSelector((state) => {
    return { singleUser: state.singleUser };
  });

  const dispatch = useDispatch();

  const [state, setState] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addUserThunk(state));
    history.goBack();
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="flex justify-center text-center text-2xl font-extrabold py-2 mb-4 text-red-600">
            Sign Up
          </h2>
          <div className="mb-4">
            <label htmlFor="username"></label>
            <input
              onChange={handleChange}
              name="username"
              value={singleUser.username}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email"></label>
            <input
              onChange={handleChange}
              name="email"
              value={singleUser.email}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Email Address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password"></label>
            <input
              onChange={handleChange}
              name="password"
              value={singleUser.password}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstName"></label>
            <input
              onChange={handleChange}
              name="firstName"
              value={singleUser.firstName}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="First Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName"></label>
            <input
              onChange={handleChange}
              name="lastName"
              value={singleUser.lastName}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Last Name"
            />
          </div>
          <div>
            <button
              className="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
