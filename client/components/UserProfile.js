import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../store/singleUser";

export default function UserProfile() {
  const { user, isLoggedIn } = useSelector((state) => {
    return {
      user: state.auth,
      isLoggedIn: !!state.auth.id,
    };
  });
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserThunk(user.id));
  }, []);

  return (
    <div>
      {" "}
      {!user.id ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full mt-14 h-64 justify-center items-center mb-96">
          <div className="bg-slate p-3  justify-center ">
            <div
              className="flex items-center  justify-center
             font-semibold text-gray-400 leading-8 "
            >
              <span className="text-grey-200 text-lg ">
                <svg
                  className="h-60"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="tracking-wide text-7xl">About</span>
            </div>
            <hr className="w-48 justify-center" />
            <div className="text-center justify-center text-lg text-gray-500 mb-16 ">
              <div className="mb-10">Status: Active</div>
              <div>Member since: {user.createdAt.slice(0, 10)}</div>
            </div>
            <hr />
            <div className="text-gray-700 justify-items-center mb-80">
              <div className="grid lg:grid-cols-2 text-lg w-full">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">First Name</div>
                  <div className="px-4 py-2">
                    {user.firstName.toUpperCase()}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Last Name</div>
                  <div className="px-4 py-2">{user.lastName.toUpperCase()}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Gender</div>
                  <div className="px-4 py-2">N/A</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Contact No.</div>
                  <div className="px-4 py-2">N/A</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Current Address</div>
                  <div className="px-4 py-2">N/A</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                    Permanant Address
                  </div>
                  <div className="px-4 py-2">N/A</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email.</div>
                  <div className="px-4 py-2">
                    <a className="text-blue-800" href="mailto:jane@example.com">
                      {user.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
