import axios from "axios";
/**
 * ACTION TYPES
 */

const TOKEN = "token";
const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
const GET_MALE_PRODUCTS = "GET_MALE_PRODUCTS";
const GET_FEMALE_PRODUCTS = "GET_FEMALE_PRODUCTS";
const GET_ACCESSORIES = "GET_ACCESSORIES";
const ADD_PRODUCT = "ADD_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
/**
 * ACTION TYPES
 */
const setAllProducts = (allProducts) => {
  return { type: GET_ALL_PRODUCTS, allProducts };
};
const setMaleProducts = (maleProducts) => {
  return { type: GET_MALE_PRODUCTS, maleProducts };
};
const setFemaleProducts = (femaleProducts) => {
  return { type: GET_FEMALE_PRODUCTS, femaleProducts };
};
const setAccessories = (accessories) => {
  return { type: GET_ACCESSORIES, accessories };
};

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
  };
};

const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product,
  };
};

const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

/**
 * THUNK CREATORS
 */
export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/allProducts");
      dispatch(setAllProducts(data));
    } catch (error) {
      console.log("Error at getAllProducts Thunk", error);
    }
  };
};
export const getMaleProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/allProducts/male");
      dispatch(setMaleProducts(data));
    } catch (error) {
      console.log("Error at getMaleProducts Thunk", error);
    }
  };
};
export const getFemaleProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/allProducts/female");
      dispatch(setFemaleProducts(data));
    } catch (error) {
      console.log("Error at getFemaleProducts Thunk", error);
    }
  };
};
export const getAccessories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/allProducts/accessories");
      dispatch(setAccessories(data));
    } catch (error) {
      console.log("Error at getAccessories Thunk", error);
    }
  };
};

export const addProductThunk = (product) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.post(
          "/api/admin/allProducts/add",
          product,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(addProduct(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProductThunk = (id, product) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.put(
          `/api/admin/allProducts/${id}`,
          product,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(editProduct(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProductThunk = (product) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.delete(
          `/api/admin/allProducts/${product}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(deleteProduct(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  allProducts: [],
  maleProducts: [],
  femaleProducts: [],
  accessories: [],
  product: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.allProducts };
    case GET_MALE_PRODUCTS:
      return { ...state, maleProducts: action.maleProducts };
    case GET_FEMALE_PRODUCTS:
      return { ...state, femaleProducts: action.femaleProducts };
    case GET_ACCESSORIES:
      return { ...state, accessories: action.accessories };
    case ADD_PRODUCT:
      return { ...state, product: action.product };
    case EDIT_PRODUCT:
      return {
        allProducts: state.allProducts
          ? [
              ...state.allProducts.filter((product) => {
                product.id !== action.product.id;
              }),
              action.product,
            ]
          : [],
      };
    case DELETE_PRODUCT:
      return {
        allProducts: state.allProducts.filter(
          (product) => product.id !== action.product.id
        ),
      };
    default:
      return state;
  }
}
