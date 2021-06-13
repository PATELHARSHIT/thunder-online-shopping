import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { addToWishList, removeFromWishList } from "../actions/wishlistActions";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";
import Title from "../components/Title";
import { Link } from "@material-ui/core";

function ProductScreen(props) {
	const productId = props.match.params.id;

	const [qty, setQty] = useState(1);
	const [size, setSize] = useState("M");
	const [isSelected, setIsSelected] = useState(false);

	const dispatch = useDispatch();
	const productDetails = useSelector(state => state.productDetails);

	const { loading, error, product } = productDetails;
	const userSignIn = useSelector(state => state.userSignIn);
	const { userInfo } = userSignIn;

	const productReviewCreate = useSelector(state => state.productReviewCreate);
	const {
		loading: loadingReviewCreate,
		error: errorReviewCreate,
		success: successReviewCreate,
	} = productReviewCreate;

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

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
		if (successReviewCreate) {
			window.alert("Review submitted successfully.");
			setComment("");
			setRating(0);
			dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
		}
		dispatch(detailsProduct(productId));
	}, [dispatch, productId, successReviewCreate]);

	const submitHandler = e => {
		e.preventDefault();
		if (comment && rating) {
			dispatch(
				createReview(productId, { rating, comment, name: userInfo.name })
			);
		} else {
			alert("Please enter comment and rating");
		}
	};

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
									<b>{product.name}</b> <br />
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
					<Title title="Reviews" />
					<div className="product top desc-container">
						<div className="col-1" style={{ width: "30%", padding: "2rem" }}>
							<ul>
								<li>
									{userInfo ? (
										<>
											<form onSubmit={submitHandler}>
												<div>
													<b style={{ fontSize: "25px", marginTop: 10 }}>
														Customer Reviews
													</b>
													<div
														className="row"
														style={{ justifyContent: "flex-start" }}
													>
														<Rating
															rating={product.rating}
															caption=" "
															size="20px"
														></Rating>
														<span style={{ fontSize: "20px" }}>
															{product.rating.toString().substring(0, 3)} out of
															5
														</span>
													</div>
													<div>{product.reviews.length} reviews</div>
													<br />
													<div>
														5 star{" "}
														<progress
															value={
																(product.reviews.reduce(
																	(a, c) => a + (c.rating === 5 ? 1 : 0),
																	0
																) /
																	product.reviews.length) *
																100
															}
															max="100"
														></progress>
														{" " +
															Math.floor(
																(product.reviews.reduce(
																	(a, c) => a + (c.rating === 5 ? 1 : 0),
																	0
																) /
																	product.reviews.length) *
																	100
															) +
															"%"}
													</div>
													<div>
														4 star{" "}
														<progress
															value={
																(product.reviews.reduce(
																	(a, c) => a + (c.rating === 4 ? 1 : 0),
																	0
																) /
																	product.reviews.length) *
																100
															}
															max="100"
														></progress>
														{" " +
															Math.floor(
																(product.reviews.reduce(
																	(a, c) => a + (c.rating === 4 ? 1 : 0),
																	0
																) /
																	product.reviews.length) *
																	100
															) +
															"%"}
													</div>

													<div>
														3 star{" "}
														<progress
															value={
																(product.reviews.reduce(
																	(a, c) => a + (c.rating === 3 ? 1 : 0),
																	0
																) /
																	product.reviews.length) *
																100
															}
															max="100"
														></progress>
														{" " +
															Math.floor(
																(product.reviews.reduce(
																	(a, c) => a + (c.rating === 3 ? 1 : 0),
																	0
																) /
																	product.reviews.length) *
																	100
															) +
															"%"}
													</div>

													<div>
														2 star{" "}
														<progress
															value={
																(product.reviews.reduce(
																	(a, c) => a + (c.rating === 2 ? 1 : 0),
																	0
																) /
																	product.reviews.length) *
																100
															}
															max="100"
														></progress>
														{" " +
															Math.floor(
																(product.reviews.reduce(
																	(a, c) => a + (c.rating === 2 ? 1 : 0),
																	0
																) /
																	product.reviews.length) *
																	100
															) +
															"%"}
													</div>

													<div>
														1 star{" "}
														<progress
															value={
																(product.reviews.reduce(
																	(a, c) => a + (c.rating === 1 ? 1 : 0),
																	0
																) /
																	product.reviews.length) *
																100
															}
															max="100"
														></progress>
														{" " +
															Math.floor(
																(product.reviews.reduce(
																	(a, c) => a + (c.rating === 1 ? 1 : 0),
																	0
																) /
																	product.reviews.length) *
																	100
															) +
															"%"}
													</div>
												</div>
												<hr />
												<div>
													<h2>Write a customer review</h2>
												</div>
												<div>
													<div>
														{loadingReviewCreate && <LoadingBox></LoadingBox>}
														{errorReviewCreate && (
															<MessageBox variant="danger">
																{errorReviewCreate}
															</MessageBox>
														)}
													</div>
													<div className="row">
														<strong>Rating</strong>

														<div className="select-drop">
															<select
																id="rating"
																value={rating}
																onChange={e => setRating(e.target.value)}
																className="select-drop-font1"
															>
																<option className="select-drop-font1" value="">
																	Select...
																</option>
																<option className="select-drop-font1" value="1">
																	1- Poor
																</option>
																<option className="select-drop-font1" value="2">
																	2- Fair
																</option>
																<option className="select-drop-font1" value="3">
																	3- Good
																</option>
																<option className="select-drop-font1" value="4">
																	4- Very good
																</option>
																<option className="select-drop-font1" value="5">
																	5- Excelent
																</option>
															</select>
														</div>
													</div>
												</div>

												<div>
													<strong>Comment</strong>
													<br />
													<textarea
														id="comment"
														value={comment}
														onChange={e => setComment(e.target.value)}
														cols="34"
														rows="5"
													></textarea>
												</div>
												<div>
													<label />
													<button
														className="primary block"
														type="submit"
														onClick={submitHandler}
													>
														Submit
													</button>
												</div>
											</form>
										</>
									) : (
										<MessageBox>
											Please <Link to="/signin">Sign In</Link> to write a review
										</MessageBox>
									)}
								</li>
							</ul>
						</div>
						<div className="col-3" style={{ padding: "3rem 8rem" }}>
							{product.reviews.length === 0 && <div>No Reviews</div>}
							{product.reviews.map(review => (
								<span key={review._id}>
									<strong>{review.name}</strong>
									<Rating rating={review.rating} caption=" "></Rating>
									<small>{Date(review.createdAt.toString())}</small>
									<p>{review.comment}</p>
									<hr />
								</span>
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default ProductScreen;
