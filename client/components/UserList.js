import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersThunk } from "../store/users";
import UserRow from "./UserRow";

const UserList = () => {
  const { users } = useSelector((state) => {
    return { users: state.users.users };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, []);

  return (
    <div className="pb-96">
      {users.length === 0 ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
      ) : (
        <div className="text-gray-900 ">
          <div className="p-4 flex justify-center">
            <h1 className="text-3xl">Users</h1>
          </div>
          <div className="px-3 py-4 flex justify-center">
            <table className="text-md shadow-md rounded mb-4">
              <tbody>
                <tr className="border-b">
                  <th className="text-left p-3 px-5">Username</th>
                  <th className="text-left p-3 px-5">Email</th>
                  <th className="text-left p-3 px-5">First Name</th>
                  <th className="text-left p-3 px-5">Last Name</th>
                  <th className="text-left p-3 px-5">Admin</th>
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
