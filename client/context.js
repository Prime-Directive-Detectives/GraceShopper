import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartQty, setCartQty] = useState(0);
	const [guestCartQty, setGuestCartQty] = useState(0);

	const openCart = () => {
		setIsCartOpen(true);
	};

	const closeCart = () => {
		setIsCartOpen(false);
	};

	const _setCartQty = (amount) => {
		setCartQty(amount);
	};

	const _setGuestCartQty = (amount) => {
		setGuestCartQty(amount);
	};

	return (
		<AppContext.Provider
			value={{
				isCartOpen,
				cartQty,
				guestCartQty,
				openCart,
				closeCart,
				_setCartQty,
				_setGuestCartQty,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

//CUSTOM HOOK
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export default AppProvider;
