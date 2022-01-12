import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/cart";
import { useGlobalContext } from "../context";

function ShoppingCart() {
	const { isCartOpen, closeCart } = useGlobalContext();

	return (
		<aside className="">
			<h1>Hello</h1>
			<button onClick={() => closeCart()}>Close Cart</button>
		</aside>
	);
}

export default ShoppingCart;
