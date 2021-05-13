import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { addToWishList, removeFromWishList } from "../actions/wishlistActions";
import { addToCart } from "../actions/cartActions";

function ProductScreen(props) {
	const productId = props.match.params.id;

	const [qty, setQty] = useState(1);
	const [size, setSize] = useState("M");
	const [isSelected, setIsSelected] = useState(false);

	const dispatch = useDispatch();
	const productDetails = useSelector(state => state.productDetails);

	const { loading, error, product } = productDetails;

	const wishlist = useSelector(state => state.wishlist);
	const { wishlistItems } = wishlist;
	let existInWishList = false;
	if (wishlistItems) {
		const i = wishlistItems.find(x => x._id === productId);
		if (i) {
			existInWishList = true;
		} else {
			existInWishList = false;
		}
	} else {
		existInWishList = false;
	}

	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;

	let existInCart = false;
	if (cartItems) {
		const i = cartItems.find(x => x.product === productId);
		if (i) {
			existInCart = true;
		} else {
			existInCart = false;
		}
	} else {
		existInCart = false;
	}

	useEffect(() => {
		dispatch(detailsProduct(productId));
	}, [dispatch, productId]);

	const handleSize = (e, action) => {
		setIsSelected(!action);
		setSize(e.target.innerHTML);
	};

	const addToCartHandler = (id, action) => {
		if (action) {
			dispatch(addToCart(id, qty, size));
		} else {
			props.history.push("/cart");
		}
	};

	const addToWishListHandler = (id, action) => {
		if (action) {
			dispatch(addToWishList(id));
		} else {
			dispatch(removeFromWishList(id));
		}
	};

	return (
		<>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<>
					<div className="row top product">
						<div className="col-2">
							<img className="large" src={product.image} alt={product.name} />
						</div>
						<div className="col-2">
							<ul>
								<li>
									<h1>{product.name}</h1>
									<span>by {product.brand}</span>
								</li>

								<li>
									<span className="productscreen-price">
										<small>₹</small>
										{Math.round(
											product.price - (product.discount * product.price) / 100
										)}
									</span>
									<br />
									{product.discount > 0 && (
										<span className="productscreen-price1">
											<strike> ₹{product.price}</strike>
										</span>
									)}
									<br />
									{product.discount > 0 && (
										<span className="discount success">
											<span>You save </span>
											{Math.round((product.discount * product.price) / 100)}!
										</span>
									)}
								</li>
								<li>
									<Rating
										rating={product.rating}
										numReviews={product.numReviews}
									/>
								</li>
								<li>
									<strong>
										{product.countInStock > 0 ? (
											<span className="success">
												<strong> In Stock</strong>
											</span>
										) : (
											<span className="danger">
												<strong> Out of Stock</strong>
											</span>
										)}
									</strong>
								</li>

								<li>
									{product.countInStock > 0 && <small>Select Size</small>}
									<div className="size">
										{product.sizeInStock.map(
											item =>
												item.qty > 0 && (
													<div
														key={item.size}
														onClick={e => handleSize(e, isSelected)}
														className={
															isSelected && size === item.size
																? "selected size-container"
																: "unselected size-container"
														}
													>
														{item.size}
													</div>
												)
										)}
									</div>
								</li>

								<br />
								{product.countInStock > 0 && (
									<>
										<li>
											<div className="select-drop">
												<span className="select-drop-font">Qty</span>
												<select
													className="select-drop-font1"
													name="Qty"
													value={qty}
													onChange={e => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map(item => (
														<option
															className="select-drop-font1"
															key={item + 1}
															value={item + 1}
														>
															{item + 1}
														</option>
													))}
												</select>
											</div>
										</li>

										<li>
											<div className="addButton">
												<button
													onClick={() =>
														addToWishListHandler(product._id, !existInWishList)
													}
													className="wishlist"
												>
													{existInWishList === true ? (
														<div className="row">
															<FavoriteIcon
																className="heart"
																fontSize="large"
															/>
															<span className="wishlist-text">WISHLISTED</span>
														</div>
													) : (
														<div className="row">
															<FavoriteBorderIcon fontSize="large" />
															<span className="wishlist-text">WISHLIST</span>
														</div>
													)}
												</button>

												<button
													onClick={() =>
														addToCartHandler(product._id, !existInCart)
													}
													className="addtocart primary block"
												>
													{existInCart === true ? "GO TO BAG" : "ADD TO BAG"}
												</button>
											</div>
										</li>
									</>
								)}
							</ul>
						</div>
					</div>
					<div className="product top desc-container">
						<div>
							{product.description.desc && (
								<div>
									<strong className="desc-head">PRODUCT DESCRIPTION</strong>
									<br />
									<div className="one-line">
										<span className="desc-text">
											{product.description.desc}
										</span>
									</div>
									<br />
								</div>
							)}
							{product.description.fit && (
								<div>
									<strong className="desc-head">
										{product.description.fit.title} FIT
									</strong>
									<br />
									<div className="one-line">
										<span className="desc-text">
											{product.description.fit.subtitle}
										</span>
									</div>
									<br />
								</div>
							)}

							{product.description.material && (
								<div>
									<strong className="desc-head">
										{product.description.material.title}
									</strong>
									<br />
									<div className="one-line">
										<span className="desc-text">
											{product.description.material.subtitle}
										</span>
									</div>
									<br />
								</div>
							)}
						</div>
						<div className="desc-sep"></div>
						<div>
							<strong className="desc-head">15 DAYS RETURNS</strong>
							<br />
							<span className="desc-text">
								Easy returns upto 15 days of delivery.
							</span>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default ProductScreen;
