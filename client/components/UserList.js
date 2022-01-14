import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersThunk } from "../store/users";
import { Link } from "react-router-dom";
import UserRow from "./UserRow";

const UserList = () => {
  const { users } = useSelector((state) => {
    return { users: state.users.users };
  });

  // Bring in actions from store
  const dispatch = useDispatch();

  //dispatch from getUsers Thunk
  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, []);

  return (
    <div>
      {users.length === 0 ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
      ) : (
        <div className="text-gray-900 ">
          <div className="p-4 flex justify-center">
            <h1 className="text-3xl">Users</h1>
          </div>
          <div className="px-3 py-4 flex justify-center">
            <table className="text-md bg-white shadow-md rounded mb-4">
              <tbody>
                <tr className="border-b">
                  <th className="text-left p-3 px-5">Name</th>
                  <th className="text-left p-3 px-5">First Name</th>
                  <th className="text-left p-3 px-5">Last Name</th>
                  <th className="text-left p-3 px-5">Role</th>
                  <th></th>
                </tr>
                {users.map((user) => {
                  return <UserRow user={user} key={user.id} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
