import Axios from "axios";
import {
	WISHLIST_ADD_ITEM,
	WISHLIST_REMOVE_ITEM,
} from "../constants/wishlistConstants";

export const addToWishList = productId => async (dispatch, getState) => {
	const { data } = await Axios.get(`/api/products/${productId}`);

	dispatch({
		type: WISHLIST_ADD_ITEM,
		payload: data,
	});
	localStorage.setItem(
		"wishlistItems",
		JSON.stringify(getState().wishlist.wishlistItems)
	);
};

export const removeFromWishList = productId => async (dispatch, getState) => {
	dispatch({ type: WISHLIST_REMOVE_ITEM, payload: productId });
	localStorage.setItem(
		"wishlistItems",
		JSON.stringify(getState().wishlist.wishlistItems)
	);
};
