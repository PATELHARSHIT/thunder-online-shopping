import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
	orderCreateReducer,
	orderDeleteReducer,
	orderDeliverReducer,
	orderDetailsReducer,
	orderListReducer,
	orderMineListReducer,
	orderPayReducer,
	orderSummaryReducer,
} from "./reducers/orderReducers";
import {
	productCategoryListReducer,
	productCreateReducer,
	productDeleteReducer,
	productDetailsReducer,
	productEditionListReducer,
	productListReducer,
	productReviewCreateReducer,
	productUpdateReducer,
} from "./reducers/productReducers";
import {
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userRegisterReducer,
	userSignInReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
} from "./reducers/userReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";

const initialState = {
	wishlist: {
		wishlistItems: localStorage.getItem("wishlistItems")
			? JSON.parse(localStorage.getItem("wishlistItems"))
			: [],
	},
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingAddress: localStorage.getItem("shippingAddress")
			? JSON.parse(localStorage.getItem("shippingAddress"))
			: {},
		paymentMethod: "PayPal",
	},
	userSignIn: {
		userInfo: localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo"))
			: null,
	},
};

const reducer = combineReducers({
	productList: productListReducer,
	orderList: orderListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	wishlist: wishlistReducer,
	userSignIn: userSignInReducer,
	userRegister: userRegisterReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderMineList: orderMineListReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productDelete: productDeleteReducer,
	orderDelete: orderDeleteReducer,
	orderDeliver: orderDeliverReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	productCategoryList: productCategoryListReducer,
	productEditionList: productEditionListReducer,
	productReviewCreate: productReviewCreateReducer,
	orderSummary: orderSummaryReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
