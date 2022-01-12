import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const openCart = () => {
		setIsCartOpen(true);
	};

	const closeCart = () => {
		setIsCartOpen(false);
	};

	return (
		<AppContext.Provider
			value={{
				isCartOpen,
				openCart,
				closeCart,
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
