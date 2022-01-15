import axios from "axios";

const TOKEN = "token";
const ADD_USER = "ADD_USER";

const addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

export const addUserThunk = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/users/add", user);
      dispatch(addUser(data));
    } catch (error) {
      console.log("Error at addUserThunk", error);
    }
  };
};

const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
