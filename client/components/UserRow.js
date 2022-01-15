import React, { useState } from "react";

const UserRow = (props) => {
  const user = props.user;

  const [state, setState] = useState(user);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState((state) => ({ ...state, [name]: value }));
  };

  return (
    <tr className="border-b hover:bg-blue-100 bg-gray-100">
      <td className="p-3 px-5">
        <input
          onChange={handleChange}
          name="username"
          type="text"
          value={state.username}
          className="bg-transparent"
        />
      </td>
      <td className="p-3 px-5">
        <input
          onChange={handleChange}
          name="email"
          type="text"
          value={state.email}
          className="bg-transparent"
        />
      </td>

      <td className="p-3 px-5">
        <input
          onChange={handleChange}
          name="firstName"
          type="text"
          value={state.firstName}
          className="bg-transparent"
        />
      </td>
      <td className="p-3 px-5">
        <input
          onChange={handleChange}
          name="lastName"
          type="text"
          value={state.lastName}
          className="bg-transparent"
        />
      </td>
      <td className="p-3 px-5">
        <select className="bg-transparent">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td className="p-3 px-5 flex justify-end">
        {user !== state && (
          <button
            type="button"
            onClick={() => props.onClickEdit(user.id, state)}
            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        )}
        <button
          type="button"
          onClick={() => props.onClickDelete(user.id)}
          className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
