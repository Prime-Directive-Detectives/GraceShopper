import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
import "../public/style.css";
import AppProvider from "./context";

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<AppProvider>
				<App />
			</AppProvider>
		</Router>
	</Provider>,
	document.getElementById("app")
);
