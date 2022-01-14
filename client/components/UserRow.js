import React, { useState } from "react";

const UserRow = (props) => {
  const user = props.user;

  const [state, setState] = useState(user);

  return (
    <tr className="border-b hover:bg-orange-100 bg-gray-100">
      <td className="p-3 px-5">
        <input type="text" value={state.username} className="bg-transparent" />
      </td>

      <td className="p-3 px-5">
        <input type="text" value={state.firstName} className="bg-transparent" />
      </td>
      <td className="p-3 px-5">
        <input type="text" value={state.lastName} className="bg-transparent" />
      </td>
      <td className="p-3 px-5">
        <select className="bg-transparent">
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </td>
      <td className="p-3 px-5 flex justify-end">
        <button
          type="button"
          className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
        <button
          type="button"
          className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
