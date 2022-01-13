import axios from "axios";

// const GOT_CART = "GOT_CART";
// const GOT_CART_PRODUCTS = "GOT_CART_PRODUCTS";
const GOT_CARTID_PRODUCTS = "GOT_CARTID_PRODUCTS";

// const gotCart = (cartId) => ({
// 	type: GOT_CART,
// 	cartId,
// });

// const gotCartProducts = (products) => ({
// 	type: GOT_CART_PRODUCTS,
// 	products,
// });

const gotCartIdAndProducts = (data) => ({
	type: GOT_CARTID_PRODUCTS,
	data,
});

// fetch cartId with userId
// export const fetchCart = (userId) => {
// 	return async (dispatch) => {
// 		try {
// 			const { data } = await axios.get(`/api/cart/user/${userId}`);
// 			dispatch(gotCart(data.id));
// 		} catch (error) {
// 			console.log("Error from fetchCart thunk", error);
// 		}
// 	};
// };

// fetch cart products with cart id
// export const fetchCartProducts = (id) => {
// 	return async (dispatch) => {
// 		try {
// 			const { data } = await axios.get(`/api/cart/${id}/products`);
// 			dispatch(gotCartProducts(data));
// 		} catch (error) {
// 			console.log("Error from fetchCart thunk", error);
// 		}
// 	};
// };

// fetch cartid and all products in that cart
export const fetchCartIdAndProducts = (userId) => {
	return async (dispatch) => {
		try {
			let cartId = await axios.get(`/api/cart/user/${userId}`);
			cartId = cartId.data.id;
			let products = await axios.get(`/api/cart/${cartId}/products`);
			products = products.data;
			const data = { cartId, products };
			dispatch(gotCartIdAndProducts(data));
		} catch (error) {
			console.log("Error from fetchCart thunk", error);
		}
	};
};

const initialState = { cartId: null, products: [] };

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		// case GOT_CART:
		// 	return { ...state, cartId: action.cartId };

		// case GOT_CART_PRODUCTS:
		// 	return { ...state, products: action.products };

		case GOT_CARTID_PRODUCTS:
			return action.data;

		default:
			return state;
	}
}
