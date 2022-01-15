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
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-red-600">
          Sign Up
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username"></label>
              <input
                onChange={handleChange}
                name="username"
                value={singleUser.username}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email"></label>
              <input
                onChange={handleChange}
                name="email"
                value={singleUser.email}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email Address"
              />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input
                onChange={handleChange}
                name="password"
                value={singleUser.password}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="firstName"></label>
              <input
                onChange={handleChange}
                name="firstName"
                value={singleUser.firstName}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
              />
            </div>
            <div>
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
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
