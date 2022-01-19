import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserThunk } from "../store/singleUser";
import { useHistory, Redirect } from "react-router-dom";
import { createOrderAndUser } from "../store/guestCheckout";

const GuestCheckout = () => {
	const dispatch = useDispatch();
	const [completed, setCompleted] = useState(false);
	const [state, setState] = useState({
		username: "",
		email: "",
		password: "",
		firstName: "",
		lastName: "",
	});

	const { guest } = useSelector((state) => {
		return { guest: state.guestCheckout };
	});

	useEffect(() => {
		if (state.username.length) {
			setCompleted(true);
			// we have the guest orders at this point -> pass the data in to redirect as props?
		}
	}, [guest]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const localStorage = JSON.parse(window.localStorage.cart);
		const productIDsAndQty = localStorage.map((item) => {
			return { productId: item.id, qty: item.quantity };
		});
		console.log("👋  from UI------>", productIDsAndQty);

		dispatch(createOrderAndUser(state, productIDsAndQty));
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setState((state) => ({ ...state, [name]: value }));
	};

	if (completed) {
		return (
			<Redirect
				to={{
					pathname: "/checkout",
					state: { id: guest },
				}}
			/>
		);
	}

	return (
		<div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-20">
			<div className="w-full max-w-md">
				<form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
					<h2 className="flex justify-center text-center text-2xl font-extrabold py-2 mb-4 text-red-600">
						Guest Checkout
					</h2>
					<div className="mb-4">
						<label htmlFor="username"></label>
						<input
							onChange={handleChange}
							name="username"
							value={state.username}
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
							placeholder="Username"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="email"></label>
						<input
							onChange={handleChange}
							name="email"
							value={state.email}
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
							placeholder="Email Address"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="password"></label>
						<input
							onChange={handleChange}
							name="password"
							value={state.password}
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
							placeholder="Password"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="firstName"></label>
						<input
							onChange={handleChange}
							name="firstName"
							value={state.firstName}
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
							placeholder="First Name"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="lastName"></label>
						<input
							onChange={handleChange}
							name="lastName"
							value={state.lastName}
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
							placeholder="Last Name"
						/>
					</div>
					<div>
						<button
							className="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							type="submit"
						>
							Checkout
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default GuestCheckout;
