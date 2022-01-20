import axios from "axios";
/**
 * ACTION TYPES
 */
const TOKEN = "token";
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCTS";
const EDIT_PRODUCT = "EDIT_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

/**
 * ACTION TYPES
 */
const setSingleProduct = (singleProduct) => {
  return { type: GET_SINGLE_PRODUCT, singleProduct };
};

const editProduct = (singleProduct) => {
  return {
    type: EDIT_PRODUCT,
    singleProduct,
  };
};

const deleteProduct = (singleProduct) => {
  return {
    type: DELETE_PRODUCT,
    singleProduct,
  };
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
      console.log("Error at editProductThunk", error);
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
      console.log("Error at deleteProductThunk", error);
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
    case EDIT_PRODUCT:
      return { ...state, singleProduct: action.singleProduct };
    case DELETE_PRODUCT:
      return { ...state, singleProduct: action.singleProduct };
    default:
      return state;
  }
}
