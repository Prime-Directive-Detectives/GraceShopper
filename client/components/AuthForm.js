import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../store";

const AuthForm = ({ formName }) => {
  //the only thing we need from the store is the error so we get that using useSelector
  const { error } = useSelector((state) => {
    return {
      error: state.auth.error,
    };
  });

  //getting the actions from the store
  const dispatch = useDispatch();

  //local state for editing
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //we need a handle submit function to handle the form submission because of what happens when you submit a form, we need to stop the default behavior of the form which is to refresh the page
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authenticate(username, password, formName));
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pb-96 mb-32">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-red-600">
          Account
        </h2>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          name={formName}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username"></label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
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
                {formName === "login"
                  ? "Login"
                  : formName === "signup"
                  ? "Sign Up"
                  : null}
              </button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
