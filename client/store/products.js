import axios from "axios";
/**
 * ACTION TYPES
 */
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_MALE_PRODUCTS = "GET_MALE_PRODUCTS";
const GET_FEMALE_PRODUCTS = "GET_FEMALE_PRODUCTS";
/**
 * ACTION TYPES
 */
const setProducts = (products) => {
  return { type: GET_PRODUCTS, products };
};
const setMaleProducts = (maleProducts) => {
  return { type: GET_MALE_PRODUCTS, maleProducts };
};
const setFemaleProducts = (femaleProducts) => {
  return { type: GET_FEMALE_PRODUCTS, femaleProducts };
};
/**
 * THUNK CREATORS
 */
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(setProducts(data));
    } catch (error) {
      console.log("Error at getProducts Thunk", error);
    }
  };
};
export const getMaleProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products/male");
      dispatch(setMaleProducts(data));
    } catch (error) {
      console.log("Error at getMaleProducts Thunk", error);
    }
  };
};
export const getFemaleProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products/female");
      dispatch(setFemaleProducts(data));
    } catch (error) {
      console.log("Error at getFemaleProducts Thunk", error);
    }
  };
};

const initialState = { products: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products };
    // case GET_MALE_PRODUCTS:
    //   return action.maleProducts;
    // case GET_FEMALE_PRODUCTS:
    //   return action.femaleProducts;
    default:
      return state;
  }
}
