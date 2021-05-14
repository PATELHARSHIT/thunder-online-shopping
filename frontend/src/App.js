import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartScreen from "./screens/CartScreen";
import WishListScreen from "./screens/WishListScreen";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";

function App() {
	return (
		<BrowserRouter>
			<div className="grid-container">
				<Header />
				<main>
					<Route path="/wishlist" component={WishListScreen}></Route>
					<Route path="/signin" component={SignInScreen}></Route>
					<Route path="/register" component={RegisterScreen}></Route>
					<Route path="/cart/:id?" component={CartScreen}></Route>
					<Route path="/" component={HomeScreen} exact></Route>
					<Route path="/shipping" component={ShippingAddressScreen}></Route>
					<Route path="/payment" component={PaymentMethodScreen}></Route>
					<Route path="/placeorder" component={PlaceOrderScreen}></Route>
					<Route path="/product/:id" component={ProductScreen}></Route>
					<Route path="/order/:id" component={OrderScreen}></Route>
					<Route path="/orderhistory" component={OrderHistoryScreen}></Route>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
