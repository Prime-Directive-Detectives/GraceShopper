import axios from "axios";

const TOKEN = "token";
const GET_ALL_USERS = "GET_ALL_USERS";

const setAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
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

const initialState = {
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.users };
    default:
      return state;
  }
}
