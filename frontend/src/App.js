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
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SearchScreen from "./screens/SearchScreen";

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
					<Route path="/product/:id" component={ProductScreen} exact></Route>
					<Route path="/order/:id" component={OrderScreen}></Route>
					<Route path="/orderhistory" component={OrderHistoryScreen}></Route>
					<Route
						path="/search/name/:name?"
						component={SearchScreen}
						exact
					></Route>
					<Route
						path="/search/category/:category"
						component={SearchScreen}
						exact
					></Route>
					<Route
						path="/search/edition/:edition"
						component={SearchScreen}
						exact
					></Route>
					<Route
						path="/search/gender/:gender"
						component={SearchScreen}
						exact
					></Route>
					<Route
						path="/search/category/:category/name/:name"
						component={SearchScreen}
						exact
					></Route>
					<Route
						path="/search/category/:category/name/:name/edition/:edition"
						component={SearchScreen}
						exact
					></Route>
					<Route
						path="/search/category/:category/name/:name/edition/:edition/gender/:gender"
						component={SearchScreen}
						exact
					></Route>
					<Route
						path="/search/category/:category/name/:name/edition/:edition/gender/:gender/min/:min/max/:max/rating/:rating/order/:order"
						component={SearchScreen}
						exact
					></Route>
					<AdminRoute
						path="/user/:id/edit"
						component={UserEditScreen}
					></AdminRoute>
					<Route
						path="/product/:id/edit"
						component={ProductEditScreen}
						exact
					></Route>
					<PrivateRoute
						path="/profile"
						component={ProfileScreen}
					></PrivateRoute>
					<AdminRoute
						path="/productlist"
						component={ProductListScreen}
					></AdminRoute>
					<AdminRoute
						path="/orderlist"
						component={OrderListScreen}
					></AdminRoute>

					<AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
