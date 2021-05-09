import React from "react";
import { useSelector } from "react-redux";
import Title from "../components/Title";
import WishListProduct from "../components/WishListProduct";

function WishListScreen() {
	const wishlist = useSelector(state => state.wishlist);
	const { wishlistItems } = wishlist;
	return (
		<div>
			{wishlistItems.length > 0 ? (
				<>
					<Title title="wishlist"></Title>
					<div className="row space-even">
						{wishlistItems.map(product => (
							<WishListProduct key={product._id} product={product} />
						))}
					</div>
				</>
			) : (
				<div className="empty-wishlist">
					{/* <img className="medium" src="/images/shopping-bag.png" /> */}
					<h3>Your Wishlist is Empty</h3>
					<span>Save items that you like in wishlist.</span>
					<span>Review them anytime and easily move then to bag.</span>
					<br />
					<a className="primary-border" type="button" href="/">
						SHOP NOW
					</a>
				</div>
			)}
		</div>
	);
}

export default WishListScreen;
