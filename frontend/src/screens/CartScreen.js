import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import { addToWishList } from "../actions/wishlistActions";

function CartScreen(props) {
	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;
	const dispatch = useDispatch();

	const removeFromCartHandler = id => {
		dispatch(removeFromCart(id));
	};

	const moveToWishList = id => {
		dispatch(addToWishList(id));
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		props.history.push("/signin?redirect=shipping");
	};

	const handleSize = (product, qty, value) => {
		dispatch(addToCart(product, qty, value));
	};

	return (
		<div className="pad">
			<p>
				<strong>My Bag</strong>{" "}
				{cartItems.reduce((a, c) => a + Number(c.qty), 0)}
				<span> item(s) </span>
			</p>
			<div className={cartItems.length > 0 && "row top"}>
				<div className={cartItems.length > 0 && "col-3"}>
					{cartItems.length === 0 ? (
						<div className="empty-cart">
							<img
								className="medium-cart"
								src="/images/shopping-bag.png"
								alt="empty-cart"
							/>
							<h3>Nothing in the bag</h3>
							<a className="secondary-border" type="button" href="/">
								Continue Shopping
							</a>
						</div>
					) : (
						<>
							{cartItems.reduce((a, c) => a + c.price * c.qty, 0) > 500 ? (
								<div className="free-delivery-container">
									<img
										className="truck"
										src="/images/delivery-truck.svg"
										alt=""
									/>
									<small>Yay! You get FREE delivery on this order</small>
								</div>
							) : (
								<div className="free-delivery-container">
									<img
										className="truck"
										src="/images/delivery-truck.svg"
										alt=""
									/>
									<small>
										Shop for more{" "}
										<b>
											₹
											{500 -
												cartItems.reduce(
													(a, c) =>
														a +
														Math.round(c.price - (c.discount * c.price) / 100) *
															c.qty,
													0
												)}
										</b>{" "}
										to avoid Shipping Charge.
									</small>
								</div>
							)}
							{cartItems.map(item => (
								<div className="cart" key={item.product}>
									<div className="cart-item">
										<div className="cart-item-info">
											<div className="cart-info">
												<Link to={`/product/${item.product}`}>
													<p>{item.productname}</p>
												</Link>

												<p className="price">
													<b>
														<span>
															₹
															{item.qty *
																Math.round(
																	item.price -
																		(item.discount * item.price) / 100
																)}
														</span>
													</b>
													<strike className="pad1">
														₹{item.qty * item.price}
													</strike>
												</p>
												<p className="discount primary">
													<span>You saved </span>
													{item.qty *
														Math.round((item.discount * item.price) / 100)}
													!
												</p>
											</div>

											<div className="row">
												<div className="select-drop mr-1">
													<span className="select-drop-font">Size</span>
													<select
														className="select-drop-font1"
														value={item.size}
														onChange={e => {
															handleSize(
																item.product,
																item.qty,
																e.target.value
															);
														}}
													>
														{item.sizeInStock.map(
															x =>
																x.qty > 0 && (
																	<option
																		className="select-drop-font1"
																		key={x.size}
																		value={x.size}
																	>
																		{x.size}
																	</option>
																)
														)}
													</select>
												</div>

												<div className="select-drop">
													<span className="select-drop-font">Qty</span>
													<select
														className="select-drop-font1"
														value={item.qty}
														onChange={e => {
															dispatch(
																addToCart(
																	item.product,
																	Number(e.target.value),
																	item.size
																)
															);
														}}
													>
														{[...Array(item.countInStock).keys()].map(x => (
															<option
																className="select-drop-font1"
																key={x + 1}
																value={x + 1}
															>
																{x + 1}
															</option>
														))}
													</select>
												</div>
											</div>
										</div>
										<div>
											<img
												className="small"
												src={item.image}
												alt={item.productname}
											/>
										</div>
									</div>
									<div className="cart-item-buttons">
										<button
											type="button"
											className="grey"
											onClick={() => removeFromCartHandler(item.product)}
										>
											Remove
										</button>

										<button
											type="button"
											className="grey"
											onClick={() => moveToWishList(item.product)}
										>
											Move to Wishlist
										</button>
									</div>
								</div>
							))}
						</>
					)}
				</div>
				{cartItems.length > 0 && (
					<div className="col-4">
						<div className="border-1">
							<div className="summary">
								<small>PRICE SUMMARY</small>
							</div>
							<div className="subtotal">
								<div className="col">
									<div className="row">
										<p>Total MRP (Incl. of taxes)</p>
										<p>₹{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</p>
									</div>
									<div className="row">
										<p>Delivery</p>
										{cartItems.reduce((a, c) => a + c.price * c.qty, 0) >
										500 ? (
											<p className="primary">FREE</p>
										) : (
											<p className="danger">₹100</p>
										)}
									</div>
									<div className="row">
										<p>Bag Discount</p>
										<p className="">
											₹
											{cartItems.reduce(
												(a, c) =>
													a + Math.round((c.discount * c.price) / 100) * c.qty,
												0
											)}
										</p>
									</div>
									<div className="row">
										<p>Subtotal</p>
										<p className="">
											₹
											{cartItems.reduce(
												(a, c) =>
													a +
													(c.price - Math.round((c.discount * c.price) / 100)) *
														c.qty,
												0
											)}
										</p>
									</div>
									<div className="savings alert-danger">
										You are saving{" "}
										<b>
											₹
											{cartItems.reduce(
												(a, c) =>
													a + Math.round((c.discount * c.price) / 100) * c.qty,
												0
											)}
										</b>{" "}
										on this order
									</div>
								</div>
							</div>
							<div className="row pad border-top">
								<div className="col">
									<small>Total</small>
									<br />
									<span>
										<b>
											₹
											{cartItems.reduce(
												(a, c) =>
													a +
													(c.price - Math.round((c.discount * c.price) / 100)) *
														c.qty,
												0
											)}
										</b>
									</span>
								</div>
								<button
									type="button"
									onClick={checkoutHandler}
									className="primary"
									disabled={cartItems.length === 0}
								>
									PROCEED TO CHECKOUT
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default CartScreen;
