import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store";
import { useHistory } from "react-router-dom";

const AuthForm = ({ formName }) => {
  //the only thing we need from the store is the error so we get that using useSelector
  const { error } = useSelector((state) => {
    return {
      error: state.auth.error,
    };
  });
  let history = useHistory();
  //getting the actions from the store
  const dispatch = useDispatch();

  //local state for editing
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //we need a handle submit function to handle the form submission because of what happens when you submit a form, we need to stop the default behavior of the form which is to refresh the page
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
    history.push("/home");
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-20 pb-96 mb-32">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="flex justify-center text-center text-2xl font-extrabold py-2 mb-4 text-red-600">
            Login
          </h2>
          <div className="mb-4">
            <label htmlFor="username"></label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              type="text"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password"></label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              className="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
