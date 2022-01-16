import axios from "axios";

const TOKEN = "token";
const GOT_ORDERID_PRODUCTS = "GOT_ORDERID_PRODUCTS";
const DELETE_ORDER_PRODUCT = "DELETE_ORDER_PRODUCT";
const UPDATE_ORDER_PRODUCT_QTY = "UPDATE_ORDER_PRODUCT_QTY";
const ADD_ORDER = "ADD_ORDER";

const gotOrderIdAndProducts = (data) => ({
  type: GOT_ORDERID_PRODUCTS,
  data,
});

const _deleteOrderProduct = (deletedProduct) => ({
  type: DELETE_ORDER_PRODUCT,
  deletedProduct,
});

const _updateOrderProductQty = (updatedProduct) => ({
  type: UPDATE_ORDER_PRODUCT_QTY,
  updatedProduct,
});

const addOrder = (order) => {
  return {
    type: ADD_ORDER,
    order,
  };
};

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
        let products = await axios.get(`/api/order/${orderId}/products`);
        products = products.data;
        let quantity = await axios.get(`/api/order/${orderId}/productIds`);
        quantity = quantity.data;
        const data = { orderId, products, quantity };
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

export const updateCartProductQty = (orderId, productId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/order/${orderId}/${productId}`, {
        quantity,
      });
      dispatch(_updateOrderProductQty(data));
    } catch (err) {
      console.log("Error from updateCartProductQty thunk", err);
    }
  };
};

export const addOrderThunk = (order) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.post("/api/order", order, {
          headers: {
            authorization: token,
          },
        });
        dispatch(addOrder(data));
      }
    } catch (error) {
      console.log("Error at addOrderThunk", error);
    }
  };
};

const initialState = { orderId: null, products: [], quantity: [], order: {} };

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDERID_PRODUCTS:
      return action.data;

    case DELETE_ORDER_PRODUCT:
      const updatedProducts = state.products.filter(
        (product) => product.id !== action.deletedProduct.productId
      );
      const updatedQuantity = state.quantity.filter(
        (product) => product.id !== action.deletedProduct.productId
      );
      return { ...state, products: updatedProducts, quantity: updatedQuantity };

    case UPDATE_ORDER_PRODUCT_QTY:
      const newQty = state.quantity.map((product) => {
        if (product.productId === action.updatedProduct.productId) {
          return { ...product, quantity: action.updatedProduct.quantity };
        }
        return product;
      });
      return { ...state, quantity: newQty };

    default:
      return state;
  }
}
