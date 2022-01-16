import axios from "axios";

const TOKEN = "token";
const GOT_ORDERID_PRODUCTS = "GOT_ORDERID_PRODUCTS";
const DELETE_ORDER_PRODUCT = "DELETE_ORDER_PRODUCT";

const gotOrderIdAndProducts = (data) => ({
  type: GOT_ORDERID_PRODUCTS,
  data,
});

const _deleteOrderProduct = (deletedProduct) => ({
  type: DELETE_ORDER_PRODUCT,
  deletedProduct,
});

// fetch orderid and all products in that order
export const fetchOrderIdAndProducts = (userId) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      if (token) {
        let orderId = await axios.get(`/api/order/user/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        orderId = orderId.data.id;
        let products = await axios.get(`/api/order/${orderId}/products`, {
          headers: {
            authorization: token,
          },
        });
        products = products.data;
        const data = { orderId, products };
        dispatch(gotOrderIdAndProducts(data));
      }
    } catch (error) {
      console.log("Error from fetchOrder thunk", error);
    }
  };
};

export const deleteOrderProduct = (orderId, productId) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.delete(
          `/api/order/${orderId}/${productId}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(_deleteOrderProduct(data));
      }
    } catch (err) {
      console.log("Error from deleteOrderProduct thunk", err);
    }
  };
};

const initialState = { orderId: null, products: [] };

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDERID_PRODUCTS:
      return action.data;

    case DELETE_ORDER_PRODUCT:
      const updatedProducts = state.products.filter(
        (product) => product.id !== action.deletedProduct.productId
      );
      return { ...state, products: updatedProducts };

    default:
      return state;
  }
}
