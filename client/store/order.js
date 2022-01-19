import axios from "axios";

const TOKEN = "token";
const GOT_ORDERID_PRODUCTS = "GOT_ORDERID_PRODUCTS";
const DELETE_ORDER_PRODUCT = "DELETE_ORDER_PRODUCT";
const DELETE_ORDER_ITEMS = "DELETE_ORDER_ITEMS";
const UPDATE_ORDER_PRODUCT_QTY = "UPDATE_ORDER_PRODUCT_QTY";
const ADD_TO_CART = "ADD_TO_CART";
const ADD_ORDER = "ADD_ORDER";

const gotOrderIdAndProducts = (data) => ({
	type: GOT_ORDERID_PRODUCTS,
	data,
});

const _deleteOrderItems = (deleteOrderItems) => {
	return {
		type: DELETE_ORDER_ITEMS,
		deleteOrderItems,
	};
};

const _deleteOrderProduct = (data) => ({
	type: DELETE_ORDER_PRODUCT,
	data,
});

const _updateOrderProductQty = (updatedQty) => ({
	type: UPDATE_ORDER_PRODUCT_QTY,
	updatedQty,
});

const _addToCart = (data) => ({
	type: ADD_TO_CART,
	data,
});

const addOrder = (order) => {
	return {
		type: ADD_ORDER,
		order,
	};
};

export const fetchOrderIdAndProducts = (userId) => {
	const token = window.localStorage.getItem(TOKEN);
	return async (dispatch) => {
		try {
			if (token) {
				let { data: order } = await axios.get(`/api/order/user/${userId}`, {
					headers: { authorization: token },
				});
				let { data: products } = await axios.get(`/api/order/${order.id}/products`, {
					header: {
						authorization: token,
					},
				});
				let { data: quantity } = await axios.get(`/api/order/${order.id}/productIds`, {
					headers: {
						authorization: token,
					},
				});
				const data = { orderId: order.id, products, quantity };
				dispatch(gotOrderIdAndProducts(data));
			}
		} catch (err) {
			console.log("Error from fetchOrderIdAndProducts thunk(no order for this user)", err);
		}
	};
};

export const deleteOrderItems = (orderId) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.delete(`/api/order/${orderId}/orderItems`);
			dispatch(_deleteOrderItems(data));
		} catch (err) {
			console.log("Error from deleteOrderItems thunk", err);
		}
	};
};

export const deleteOrderProduct = (orderId, productId) => {
	return async (dispatch) => {
		try {
			await axios.delete(`/api/order/${orderId}/${productId}`);
			const { data: quantity } = await axios.get(`/api/order/${orderId}/productIds`);
			const { data: products } = await axios.get(`/api/order/${orderId}/products`);
			const data = { quantity, products };
			dispatch(_deleteOrderProduct(data));
		} catch (err) {
			console.log("Error from deleteOrderProduct thunk", err);
		}
	};
};

export const updateOrderProductQty = (orderId, productId, quantity) => {
	return async (dispatch) => {
		try {
			await axios.put(`/api/order/${orderId}/${productId}`, {
				quantity,
			});
			const { data: updatedQty } = await axios.get(`/api/order/${orderId}/productIds`);
			dispatch(_updateOrderProductQty(updatedQty));
		} catch (err) {
			console.log("Error from updateOrderProductQty thunk", err);
		}
	};
};

export const addToCart = (userId, productId) => {
	return async (dispatch) => {
		try {
			let { data: order } = await axios.get(`/api/order/user/${userId}/foc`);
			let { data: product } = await axios.get(`/api/order/${order.id}/${productId}`);
			if (!product) {
				await axios.post(`/api/order/${order.id}/${productId}`);
			} else {
				await axios.put(`/api/order/${order.id}/${productId}`, {
					quantity: product.quantity + 1,
				});
			}
			let { data: products } = await axios.get(`/api/order/${order.id}/products`);
			let { data: quantity } = await axios.get(`/api/order/${order.id}/productIds`);
			const data = { orderId: order.id, products, quantity };
			dispatch(_addToCart(data));
		} catch (err) {
			console.log("Error from addToCart thunk", err);
		}
	};
};

export const addOrderThunk = (order) => {
	const token = window.localStorage.getItem(TOKEN);
	return async (dispatch) => {
		try {
			if (token) {
				const { data } = await axios.post("/api/order/add", order, {
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

const initialState = {
	orderId: null,
	products: [],
	quantity: [],
	order: {},
	orderItems: [],
};

export default function orderReducer(state = initialState, action) {
	switch (action.type) {
		case GOT_ORDERID_PRODUCTS: {
			const { orderId, products, quantity } = action.data;
			return { ...state, orderId, products, quantity };
		}
		case DELETE_ORDER_PRODUCT: {
			const { quantity, products } = action.data;
			return { ...state, products, quantity };
		}
		case UPDATE_ORDER_PRODUCT_QTY:
			return { ...state, quantity: action.updatedQty };

		case DELETE_ORDER_ITEMS:
			return { ...state, orderItems: action.deleteOrderItems };

		case ADD_TO_CART: {
			const { orderId, products, quantity } = action.data;
			return { ...state, orderId, products, quantity };
		}
		case ADD_ORDER:
			return { ...state, order: action.order };

		default:
			return state;
	}
}
