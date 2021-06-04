import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import GooglePayButton from "@google-pay/button-react";
import uuid from "react-uuid";
import {
	ORDER_DELIVER_RESET,
	ORDER_PAY_RESET,
} from "../constants/orderConstants";

function OrderScreen(props) {
	const dispatch = useDispatch();
	const orderId = props.match.params.id;
	const orderDetails = useSelector(state => state.orderDetails);
	const { loading, error, order } = orderDetails;
	const userSignIn = useSelector(state => state.userSignIn);
	const { userInfo } = userSignIn;

	const orderPay = useSelector(state => state.orderPay);
	const {
		loading: loadingPay,
		error: errorPay,
		success: successPay,
	} = orderPay;

	const orderDeliver = useSelector(state => state.orderDeliver);
	const {
		loading: loadingDeliver,
		error: errorDeliver,
		success: successDeliver,
	} = orderDeliver;

	useEffect(() => {
		if (
			!order ||
			successPay ||
			successDeliver ||
			(order && order._id !== orderId)
		) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(detailsOrder(orderId));
		}
	}, [dispatch, orderId, successPay, order, successDeliver]);
	const successPaymentHandler = data => {
		const paymentResult = {
			id: uuid(),
			status: data.status,
			update_time: Date.now(),
			email_address: data.email,
		};
		dispatch(payOrder(order, paymentResult));
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(order._id));
	};

	return loading ? (
		<LoadingBox></LoadingBox>
	) : error ? (
		<MessageBox variant="danger">{error}</MessageBox>
	) : (
		<div>
			<div className="row top">
				<div className="col-3">
					<ul>
						<li>
							<div className="card-placeorder">
								<strong>Order Id: </strong> {order._id}
							</div>
						</li>
						<li>
							<div className="card-placeorder">
								<li className="summary left-a">
									<span>SHIPPING ADDRESS</span>
								</li>
								<p>
									<strong>Name: </strong> {order.shippingAddress.fullName}
									<br />
									<strong>Address: </strong> {order.shippingAddress.address},{" "}
									{order.shippingAddress.city},{" "}
									{order.shippingAddress.postalCode},{" "}
									{order.shippingAddress.country}
								</p>
								{order.isDelivered ? (
									<MessageBox variant="success">
										Delivered at {order.deliveredAt}
									</MessageBox>
								) : (
									<MessageBox variant="danger">Not Delivered</MessageBox>
								)}
							</div>
						</li>

						<li>
							<div className="card-placeorder">
								<li className="summary left-a">
									<span>PAYMENT</span>
								</li>
								<p>
									<strong>Payment Mode: </strong> {order.paymentMethod}
								</p>
								{order.isPaid ? (
									<MessageBox variant="success">
										Paid at {order.paidAt}
									</MessageBox>
								) : (
									<MessageBox variant="danger">Not Paid</MessageBox>
								)}
							</div>
						</li>

						<li>
							<div className="card-placeorder">
								<li className="summary left-a">
									<span>ORDER ITEMS</span>
								</li>
								<ul>
									{order.orderItems.map(item => (
										<div key={item._id} className="cart">
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
									<div>₹{order.itemsPrice}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>Shipping</div>
									<div>₹{order.shippingPrice}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>Tax</div>
									<div>₹{order.taxPrice}</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>
										<strong>Total</strong>
									</div>
									<div>
										<strong>₹{order.totalPrice}</strong>
									</div>
								</div>
							</li>
							<li>
								<div className="savings alert-danger">
									You are saving <b>₹{order.discount}</b> on this order
								</div>
							</li>
							<li>
								{!order.isPaid && (
									<>
										{errorPay && (
											<MessageBox variant="danger">{errorPay}</MessageBox>
										)}
										{loadingPay && <LoadingBox />}
										<GooglePayButton
											style={{ width: "100%" }}
											environment="TEST"
											paymentRequest={{
												apiVersion: 2,
												apiVersionMinor: 0,
												allowedPaymentMethods: [
													{
														type: "CARD",
														parameters: {
															allowedAuthMethods: [
																"PAN_ONLY",
																"CRYPTOGRAM_3DS",
															],
															allowedCardNetworks: ["MASTERCARD", "VISA"],
														},
														tokenizationSpecification: {
															type: "PAYMENT_GATEWAY",
															parameters: {
																gateway: "example",
																gatewayMerchantId: "exampleGatewayMerchantId",
															},
														},
													},
												],
												merchantInfo: {
													merchantId: "12345678901234567890",
													merchantName: "Demo Merchant",
												},
												transactionInfo: {
													totalPriceStatus: "FINAL",
													totalPriceLabel: "Total",
													totalPrice: order.totalPrice.toString(),
													currencyCode: "INR",
													countryCode: "IN",
												},
												shippingAddressRequired: true,
												emailRequired: true,

												callbackIntents: [
													"SHIPPING_ADDRESS",
													"PAYMENT_AUTHORIZATION",
												],
											}}
											onLoadPaymentData={paymentRequest => {
												console.log("Success", paymentRequest);
												successPaymentHandler({
													...paymentRequest,
													status: "SUCCESS",
												});
											}}
											onPaymentAuthorized={paymentData => {
												console.log("Payment Authorised Success", paymentData);
												return { transactionState: "SUCCESS" };
											}}
											onPaymentDataChanged={paymentData => {
												console.log("On Payment Data Changed", paymentData);
												return {};
											}}
											existingPaymentMethodRequired="false"
											buttonColor="black"
											buttonType="Buy"
											buttonSizeMode="fill"
										/>
									</>
								)}
							</li>
							{userInfo.isAdmin && order.isPaid && !order.isDelivered && (
								<li>
									{loadingDeliver && <LoadingBox></LoadingBox>}
									{errorDeliver && (
										<MessageBox variant="danger">{errorDeliver}</MessageBox>
									)}
									<button
										type="button"
										className="primary block"
										onClick={deliverHandler}
									>
										Deliver Order
									</button>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderScreen;
