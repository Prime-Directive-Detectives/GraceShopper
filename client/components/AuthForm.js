// import React from 'react'
// import {connect} from 'react-redux'
// import {authenticate} from '../store'

// /**
//  * COMPONENT
//  */
// const AuthForm = props => {
//   const {name, displayName, handleSubmit, error} = props

//   console.log(`name: ${name} \n displayName: ${displayName}, error: ${error}`)

//   return (
//     <div>
//       <form onSubmit={handleSubmit} name={name}>
//         <div>
//           <label htmlFor="username">
//             <small>Username</small>
//           </label>
//           <input name="username" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <small>Password</small>
//           </label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//     </div>
//   )
// }

// // /**
// //  * CONTAINER
// //  *   Note that we have two different sets of 'mapStateToProps' functions -
// //  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
// //  *   function, and share the same Component. This is a good example of how we
// //  *   can stay DRY with interfaces that are very similar to each other!
// //  */
// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error
//   }
// }

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.auth.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const username = evt.target.username.value
//       const password = evt.target.password.value
//       dispatch(authenticate(username, password, formName))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

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
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          name={formName}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username">
                <small>Username</small>
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
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
