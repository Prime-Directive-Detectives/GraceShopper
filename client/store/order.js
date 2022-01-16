import axios from "axios";

const GOT_ORDERID_PRODUCTS = "GOT_ORDERID_PRODUCTS";
const DELETE_ORDER_PRODUCT = "DELETE_ORDER_PRODUCT";
const UPDATE_ORDER_PRODUCT_QTY = "UPDATE_ORDER_PRODUCT_QTY";
const ADD_TO_CART = "ADD_TO_CART";

const gotOrderIdAndProducts = (data) => ({
	type: GOT_ORDERID_PRODUCTS,
	data,
});

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

export const fetchOrderIdAndProducts = (userId) => {
	return async (dispatch) => {
		try {
			let { data: order } = await axios.get(`/api/order/user/${userId}`);
			let { data: products } = await axios.get(`/api/order/${order.id}/products`);
			let { data: quantity } = await axios.get(`/api/order/${order.id}/productIds`);
			const data = { orderId: order.id, products, quantity };
			dispatch(gotOrderIdAndProducts(data));
		} catch (err) {
			console.log("Error from fetchOrderIdAndProducts thunk(no order for this user)", err);
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

const initialState = { orderId: null, products: [], quantity: [] };

export default function orderReducer(state = initialState, action) {
	switch (action.type) {
		case GOT_ORDERID_PRODUCTS:
			return action.data;

		case DELETE_ORDER_PRODUCT:
			const { quantity, products } = action.data;
			return { ...state, products, quantity };

		case UPDATE_ORDER_PRODUCT_QTY:
			return { ...state, quantity: action.updatedQty };

		case ADD_TO_CART:
			return action.data;

		default:
			return state;
	}
}
