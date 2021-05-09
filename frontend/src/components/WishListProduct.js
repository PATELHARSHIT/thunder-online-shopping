import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { removeFromWishList } from "../actions/wishlistActions";
import CloseIcon from "@material-ui/icons/Close";

function WishListProduct(props) {
	const product = props.product;
	const dispatch = useDispatch();
	const addToCartHandler = () => {
		dispatch(addToCart(product._id, 1));
		dispatch(removeFromWishList(product._id));
	};
	const removeFromWishlistHandler = id => {
		dispatch(removeFromWishList(id));
	};

	return (
		<div key={product._id} className="card">
			<Link to={`/product/${product._id}`}>
				<img className="medium" src={product.image} alt={product.name} />
			</Link>
			<div className="card-body">
				<Link to={`/product/${product._id}`}>
					<p>{product.name}</p>
				</Link>
				<div className="row">
					<span className="price">
						<b>
							₹
							{Math.round(
								product.price - (product.discount * product.price) / 100
							)}
						</b>
						{product.discount > 0 && (
							<strike className="pad1">₹{product.price}</strike>
						)}
					</span>
				</div>
				<div className="addButton">
					<a
						onClick={() => removeFromWishlistHandler(product._id)}
						className="addtocart primary"
					>
						{/* <CloseIcon fontSize="large" /> */}
						Remove
					</a>

					<a onClick={addToCartHandler} className="addtocart">
						Add to Bag
					</a>
				</div>
			</div>
		</div>
	);
}

export default WishListProduct;
