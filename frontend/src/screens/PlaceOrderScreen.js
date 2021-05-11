import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import CartScreen from "./CartScreen";

function PlaceOrderScreen(props) {
	const cart = useSelector(state => state.cart);
	if (!cart.paymentMethod) {
		props.history.push("/payment");
	}

	const toPrice = num => Number(num.toFixed(2));

	cart.itemsPrice = toPrice(
		cart.cartItems.reduce(
			(a, c) => a + c.qty * Math.round(c.price - (c.discount * c.price) / 100),
			0
		)
	);
	cart.discount = toPrice(
		cart.cartItems.reduce(
			(a, c) => a + Math.round((c.discount * c.price) / 100) * c.qty,
			0
		)
	);

	cart.shippingPrice = cart.itemsPrice > 500 ? toPrice(0) : toPrice(100);
	cart.taxPrice = toPrice(cart.itemsPrice * 0.18);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	const placeOrderHandler = () => {};

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />
			<div className="row top">
				<div className="col-3">
					<ul>
						<li>
							<div className="card-placeorder">
								<li className="summary">
									<span>SHIPPING ADDRESS</span>
								</li>
								<p>
									<strong>Name: </strong> {cart.shippingAddress.fullName}
									<br />
									<strong>Address: </strong> {cart.shippingAddress.address},{" "}
									{cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
									, {cart.shippingAddress.country}
								</p>
								<p>
									<strong>Payment Mode: </strong> {cart.paymentMethod}
								</p>
							</div>
						</li>

						<li>
							<div className="card-placeorder">
								<li className="summary">
									<span>ORDER ITEMS</span>
								</li>
								<ul>
									{cart.cartItems.map(item => (
										<div className="cart">
											<div className="cart-item">
												<div>
													<img
														className="xsmall"
														src={item.image}
														alt={item.productname}
													/>
												</div>
												<div className="cart-item-info">
													<div className="cart-info">
														<Link to={`/product/${item.product}`}>
															<p>{item.productname}</p>
														</Link>
													</div>
												</div>

												<div className="cart-item-info">
													<p>
														{item.qty} x ₹
														{Math.round(
															item.price - (item.discount * item.price) / 100
														)}{" "}
														= ₹
														{item.qty *
															Math.round(
																item.price - (item.discount * item.price) / 100
															)}
													</p>
												</div>
											</div>
										</div>
									))}
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div className="col-1">
					<div className="card-placeorder">
						<ul>
							<li className="summary">
								<span>PRICE SUMMARY</span>
							</li>
							<li>
								<div className="row">
									<div>Items</div>
									<div>₹{cart.itemsPrice}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>Shipping</div>
									<div>₹{cart.shippingPrice}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>Tax</div>
									<div>₹{cart.taxPrice}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>
										<strong>Total</strong>
									</div>
									<div>
										<strong>₹{cart.totalPrice}</strong>
									</div>
								</div>
							</li>
							<li>
								<div className="savings alert-danger">
									You are saving <b>₹{cart.discount}</b> on this order
								</div>
							</li>
							<li>
								<button
									type="button"
									onClick={placeOrderHandler}
									className="primary block"
									disabled={cart.cartItems.length === 0}
								>
									Place Order
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PlaceOrderScreen;
