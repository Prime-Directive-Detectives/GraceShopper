import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartQty, setCartQty] = useState(0);

	const openCart = () => {
		setIsCartOpen(true);
	};

	const closeCart = () => {
		setIsCartOpen(false);
	};

	const _setCartQty = (amount) => {
		setCartQty(amount);
	};

	return (
		<AppContext.Provider
			value={{
				isCartOpen,
				cartQty,
				openCart,
				closeCart,
				_setCartQty,
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
