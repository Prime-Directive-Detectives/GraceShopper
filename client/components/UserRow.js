import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { editUserThunk, deleteUserThunk } from "../store/users";

const UserRow = (props) => {
  const user = props.user;

  const [edit, setEdit] = useState(false);
  const [state, setState] = useState(user);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (edit) {
      setState((state) => ({ ...state, [name]: value }));
    }
  };

  const onClickChange = useCallback(() => {
    setEdit(!edit), [edit, setEdit];
  });

  const onClickEdit = (id, user) => {
    dispatch(editUserThunk(id, user));
    setEdit(!edit);
  };

  const onClickDelete = (id) => {
    dispatch(deleteUserThunk(id));
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
      {state.adminStatus ? (
        <td className="p-3 px-5">Admin</td>
      ) : (
        <td className="p-3 px-5">User</td>
      )}
      <td className="p-3 px-5 flex justify-end">
        {edit ? (
          <button
            type="button"
            onClick={() => onClickEdit(user.id, state)}
            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={onClickChange}
            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
        )}
        <button
          type="button"
          onClick={() => onClickDelete(user.id)}
          className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
