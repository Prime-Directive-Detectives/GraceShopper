import axios from "axios";
/**
 * ACTION TYPES
 */
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCTS";

/**
 * ACTION TYPES
 */
const setSingleProduct = (singleProduct) => {
  return { type: GET_SINGLE_PRODUCT, singleProduct };
};

/**
 * THUNK CREATORS
 */
export const getSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/allProducts/${id}`);
      dispatch(setSingleProduct(data));
    } catch (error) {
      console.log("Error at getSingleProduct Thunk", error);
    }
  };
};

const initialState = {
  singleProduct: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.singleProduct };
    default:
      return state;
  }
}
