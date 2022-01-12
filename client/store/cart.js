import axios from "axios";

const GOT_CART = "GOT_CART";
const GOT_CART_PRODUCTS = "GOT_CART_PRODUCTS";

const gotCart = (userId) => ({
	type: GOT_CART,
	userId,
});

const gotCartProducts = (products) => ({
	type: GOT_CART_PRODUCTS,
	products,
});

export const fetchCart = (userId) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/api/cart/user/${userId}`);
			dispatch(gotCart(data[0].id));
		} catch (error) {
			console.log("Error from fetchCart thunk", error);
		}
	};
};

export const fetchCartProducts = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/api/cart/${id}/products`);
			dispatch(gotCartProducts(data));
		} catch (error) {
			console.log("Error from fetchCart thunk", error);
		}
	};
};

const initialState = { id: null, products: [] };

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case GOT_CART:
			return { ...state, id: action.userId.id };

		case GOT_CART_PRODUCTS:
			return { ...state, products: action.products };

		default:
			return state;
	}
}
