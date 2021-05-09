import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
	productDetailsReducer,
	productListReducer,
} from "./reducers/productReducers";
import { userRegisterReducer, userSignInReducer } from "./reducers/userReducer";
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
	},
	userSignIn: {
		userInfo: localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo"))
			: null,
	},
};

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	wishlist: wishlistReducer,
	userSignIn: userSignInReducer,
	userRegister: userRegisterReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
