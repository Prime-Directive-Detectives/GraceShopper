import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct } from "../store/singleProduct";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../store/products";
import { addToCart } from "../store/order";
import { useGlobalContext } from "../context";

const SingleProduct = () => {
	const { _setGuestCartQty } = useGlobalContext();
	const [loadedProduct, setLoadedProduct] = useState({});

	const { singleProduct } = useSelector((state) => {
		return { singleProduct: state.singleProduct.singleProduct };
	});
	const { allProducts } = useSelector((state) => {
		return { allProducts: state.products.allProducts };
	});
	const { user, isLoggedIn } = useSelector((state) => {
		return {
			user: state.auth,
			isLoggedIn: !!state.auth.id,
		};
	});

	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSingleProduct(id));
		dispatch(getAllProducts());
	}, []);

	useEffect(() => {
		setLoadedProduct(singleProduct);
	}, [singleProduct]);

	let similarProducts = allProducts.filter((product) => product.type === singleProduct.type);

	const guestAddToCart = (id, color, imageUrl, price, name) => {
		const guestCart = window.localStorage.getItem("cart");
		if (!guestCart) {
			window.localStorage.setItem("cart", JSON.stringify([{ id, quantity: 1, color, imageUrl, price, name }]));
			_setGuestCartQty(1);
		} else {
			let tempCart = JSON.parse(guestCart);

			let item = tempCart.find((item) => item.id === id);
			if (!item) {
				tempCart.push({ id, quantity: 1, color, imageUrl, price, name });
				const amount = tempCart.reduce((total, item) => {
					return (total += item.quantity);
				}, 0);
				_setGuestCartQty(amount);
				window.localStorage.setItem("cart", JSON.stringify(tempCart));
			} else {
				tempCart = tempCart.map((item) => {
					if (item.id === id) {
						item.quantity < 10 && item.quantity++;
					}
					return item;
				});
				const amount = tempCart.reduce((total, item) => {
					return (total += item.quantity);
				}, 0);
				_setGuestCartQty(amount);
				window.localStorage.setItem("cart", JSON.stringify(tempCart));
			}
		}
	};

	return (
		<div className="container mx-auto px-6">
			{!loadedProduct ? (
				<img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif" />
			) : (
				<div className="my-8">
					<div className="md:flex md:items-center">
						<div className="w-full h-64 md:w-1/2 lg:h-96">
							<img className="h-full w-full rounded-md object-cover max-w-lg mx-auto" src={loadedProduct.imageUrl} />
						</div>
						<div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2  content-center items-center">
							<h3 className="text-gray-700 uppercase text-lg">{loadedProduct.name}</h3>
							<span className="text-gray-500 mt-3">${loadedProduct.price}</span>
							<br />
							<hr className="my-3"></hr>
							<div className="mt-2">
								<label className="text-gray-700 text-sm">Count:</label>
								<div className="flex items-center mt-1">
									<button className="text-gray-500 focus:outline-none focus:text-gray-600">
										<svg
											className="h-5 w-5"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
									</button>

									<span className="text-gray-700 text-lg mx-2">1</span>
									<button className="text-gray-500 focus:outline-none focus:text-gray-600">
										<svg
											className="h-5 w-5"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
									</button>
								</div>
							</div>
							<br />
							<h6 className="text-gray-700  ">{loadedProduct.description}</h6>
							<div className="flex items-center mt-6 space-x-3">
								<button
									onClick={() => {
										isLoggedIn
											? dispatch(addToCart(user.id, loadedProduct.id))
											: guestAddToCart(
													loadedProduct.id,
													loadedProduct.color,
													loadedProduct.imageUrl,
													loadedProduct.price,
													loadedProduct.name
											  );
									}}
									className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
								>
									Add to Cart
								</button>
								<button className="px-8 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-400 focus:outline-none focus:bg-red-400">
									Add to Wishlist
								</button>
							</div>
						</div>
					</div>
					<div className="mt-2">
						<h3 className="text-gray-600 text-2xl font-medium">Similar Products</h3>
						{!similarProducts.length === 0 ? (
							<div>Loading...</div>
						) : (
							<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
								{similarProducts.map((product) => {
									return (
										<div key={product.id} onClick={() => setLoadedProduct(product)}>
											<div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
												<div className="flex-wrap">
													<img className="flex items-end justify-end h-56 w-full bg-cover" src={product.imageUrl} />
													{/* <button className="p-2 rounded-full bg-indigo-600 text-white mx-5 -mb-15 hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
														<svg
															className="h-5 w-5"
															fill="none"
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
														</svg>
													</button> */}
												</div>
												<div className="px-5 py-3">
													<h3 className="text-gray-700 uppercase">{product.name}</h3>
													<span className="text-gray-500 mt-2">${product.price}</span>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default SingleProduct;
