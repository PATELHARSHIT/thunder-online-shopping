import {
	WISHLIST_ADD_ITEM,
	WISHLIST_REMOVE_ITEM,
} from "../constants/wishlistConstants";

export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
	switch (action.type) {
		case WISHLIST_ADD_ITEM:
			const item = action.payload;
			const existItem = state.wishlistItems.find(x => x._id === item._id);

			if (existItem) {
				return {
					...state,
					wishlistItems: state.wishlistItems.map(x =>
						x._id === existItem._id ? item : x
					),
				};
			} else {
				return { ...state, wishlistItems: [...state.wishlistItems, item] };
			}
		case WISHLIST_REMOVE_ITEM:
			return {
				...state,
				wishlistItems: state.wishlistItems.filter(
					x => x._id !== action.payload
				),
			};
		default:
			return state;
	}
};
