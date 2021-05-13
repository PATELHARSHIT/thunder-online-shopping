import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Title from "../components/Title";

function PaymentMethodScreen(props) {
	const cart = useSelector(state => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress.address) {
		props.history.push("/shipping");
	}
	const [paymentMethod, setPaymentMethod] = useState("Online");
	const dispatch = useDispatch();
	const submitHandler = e => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		props.history.push("/placeorder");
	};
	return (
		<div>
			<CheckoutSteps step1 step2 step3 />
			<Title title="Payment Method" />
			<form className="form" onSubmit={submitHandler}>
				<div>
					<div>
						<input
							type="radio"
							name="paymentMethod"
							value="Online"
							id="online"
							required
							checked
							onChange={e => setPaymentMethod(e.target.value)}
						/>
						<label htmlFor="online">Online</label>
					</div>
				</div>
				{/* <div>
					<div>
						<input
							type="radio"
							name="paymentMethod"
							value="Stripe"
							id="stripe"
							required
							onChange={e => setPaymentMethod(e.target.value)}
						/>
						<label htmlFor="stripe">Stripe</label>
					</div>
				</div> */}
				<div>
					<button type="submit" className="primary">
						Continue
					</button>
				</div>
			</form>
		</div>
	);
}

export default PaymentMethodScreen;
