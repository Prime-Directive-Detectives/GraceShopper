import axios from "axios";

const GOT_CARTID_PRODUCTS = "GOT_CARTID_PRODUCTS";
const DELETE_CART_PRODUCT = "DELETE_CART_PRODUCT";

const gotCartIdAndProducts = (data) => ({
	type: GOT_CARTID_PRODUCTS,
	data,
});

const _deleteCartProduct = (deletedProduct) => ({
	type: DELETE_CART_PRODUCT,
	deletedProduct,
});

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

export const deleteCartProduct = (cartId, productId) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.delete(`/api/cart/${cartId}/${productId}`);
			dispatch(_deleteCartProduct(data));
		} catch (err) {
			console.log("Error from deleteCartProduct thunk", err);
		}
	};
};

const initialState = { cartId: null, products: [] };

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case GOT_CARTID_PRODUCTS:
			return action.data;

		case DELETE_CART_PRODUCT:
			const updatedProducts = state.products.filter(
				(product) => product.id !== action.deletedProduct.productId
			);
			return { ...state, products: updatedProducts };

		default:
			return state;
	}
}
