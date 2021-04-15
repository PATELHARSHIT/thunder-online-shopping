import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartScreen from "./screens/CartScreen";

function App() {
	return (
		<BrowserRouter>
			<div className="grid-container">
				<Header />
				<main>
					<Route path="/cart/:id?" component={CartScreen}></Route>
					<Route path="/product/:id" component={ProductScreen}></Route>
					<Route path="/" component={HomeScreen} exact></Route>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
