import axios from "axios";

const TOKEN = "token";
const GET_ALL_USERS = "GET_ALL_USERS";
const EDIT_USER = "EDIT_USER";
const DELETE_USER = "DELETE_USER";
const GET_USER = "GET_USER";

const setAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

const editUser = (user) => {
  return {
    type: EDIT_USER,
    user,
  };
};

const getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

export const getUserThunk = (id) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.get(`/api/admin/users/${id}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(getUser(data));
      }
    } catch (err) {
      console.log("Error at getUserThunk", err);
    }
  };
};

export const getAllUsersThunk = () => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.get("/api/admin/users", {
          headers: {
            authorization: token,
          },
        });
        dispatch(setAllUsers(data));
      }
    } catch (error) {
      console.log("Error at getAllUsersThunk", error);
    }
  };
};

export const editUserThunk = (id, user) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.put(`/api/admin/users/${id}`, user, {
          headers: {
            authorization: token,
          },
        });
        dispatch(editUser(data));
      }
    } catch (error) {
      console.log("Error at editUserThunk", error);
    }
  };
};

export const deleteUserThunk = (user) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.delete(`/api/admin/users/${user}`, {
          headers: {
            authorization: token,
          },
        });

        dispatch(deleteUser(data));
      }
    } catch (error) {
      console.log("Error at deleteUserThunk", error);
    }
  };
};

const initialState = {
  users: [],
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.users };
    case EDIT_USER:
      const index = state.users.findIndex((user) => user.id === action.user.id);
      const users = state.users;
      users[index] = action.user;
      return { ...state, users };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.user.id),
      };
    case GET_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
}
