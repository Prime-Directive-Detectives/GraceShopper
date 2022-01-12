import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/cart";

function ShoppingCart() {
	const [cartId, setCartId] = useState(null);

	const { cart } = useSelector((state) => {
		return {
			cart: state.cart,
		};
	});

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchId = async () => {
			const id = await dispatch(fetchCart(2));
			console.log("👋  id ------>", id);
			setCartId(res);
		};
		fetchId();
		console.log("👋  ------>", cartId);
	}, []);

	return (
		<aside className={`cart`}>
			<h1>{cartId}</h1>
		</aside>
	);
}

export default ShoppingCart;
