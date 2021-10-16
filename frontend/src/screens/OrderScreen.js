import React, { useState } from "react";
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
import emailjs from "emailjs-com";
import axios from "axios";

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

	async function confirmOrder(e) {
		e.preventDefault();

		await axios.post("/send_email", orderDetails);
		dispatch(detailsOrder(orderId));
		emailjs
			.sendForm(
				"service_f168k1p",
				"template_wnljoal",
				e.target,
				"user_Dna25yKcDHl9mcrilxGln"
			)
			.then(
				result => {
					console.log(result.text);
				},
				error => {
					console.log(error.text);
				}
			);
	}

	let email_message = "";
	if (order) {
		email_message = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>

    <style type="text/css">
      table, td { color: #000000; } @media (max-width: 480px) { #u_content_text_1 .v-color { color: #000000 !important; } #u_content_text_1 .v-text-align { text-align: center !important; } #u_content_text_1 .v-line-height { line-height: 100% !important; } }
@media only screen and (min-width: 520px) {
  .u-row {
    width: 500px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 500px !important;
  }

}

@media (max-width: 520px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

</style>



<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->


<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->

<table id="u_content_text_1" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">

  <div class="v-color v-text-align v-line-height" style="line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 100%;"><strong><span style="font-size: 20px; line-height: 20px;">THUNDER</span></strong></p>
<p style="font-size: 14px; line-height: 100%;"><span style="font-size: 12px; line-height: 12px;">SWEAT IN STYLE</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">

  <div class="v-color v-text-align v-line-height" style="line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong>Order Number: </strong><span style="color: #3598db; font-size: 14px; line-height: 19.6px;">#${
			order._id
		}</span></p>
<p style="font-size: 14px; line-height: 140%;"><strong><span style="color: #000000; font-size: 14px; line-height: 19.6px;">Order Date: </span></strong><span style="color: #000000; font-size: 14px; line-height: 19.6px;">&nbsp;${order.createdAt
			.toString()
			.substring(0, 10)}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">

  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">

  <div class="v-color v-text-align v-line-height" style="line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong>Address: </strong></p>
<p style="font-size: 14px; line-height: 140%;"><span style="color: #7e8c8d; font-size: 14px; line-height: 19.6px;">${
			order.shippingAddress.fullName
		}</span><br /><span style="color: #7e8c8d; font-size: 14px; line-height: 19.6px;">${
			order.shippingAddress.address
		} </span><span style="color: #7e8c8d; font-size: 14px; line-height: 19.6px;">, ${
			order.shippingAddress.city
		}, ${order.shippingAddress.country}, ${
			order.shippingAddress.postalCode
		}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">

  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">

  <div>
    ${order.orderItems.map(
			item => `

<div>

  <p style="font-size: 15px; font-weight: bold;">
  	${item.productname}
  </p>
  <p style="font-size: 12px;">Quantity: ${item.qty}</p>
  <p style="font-size: 12px;">Size: ${item.size}</p>
  <p style="font-size: 12px;">₹${item.price} Per Unit</p>
  <p style="font-size: 12px;"><b>Total: </b>₹${item.qty * item.price}</p>
</div>

`
		)}
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">

  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">

  <div>

<div style="display: flex; justify-content: space-between">
    <div style="font-weight: bold">
        Sub-Total:
    </div>
    <div>
        ₹${order.itemsPrice}
    </div>
</div>
<div style="display: flex; justify-content: space-between">
    <div style="font-weight: bold">
        Shipping Fee:
    </div>
    <div>
        ₹${order.shippingPrice}
    </div>
</div>
<div style="display: flex; justify-content: space-between">
    <div style="font-weight: bold">
        Tax:
    </div>
    <div>
        ₹${order.taxPrice}
    </div>
</div>
<div style="display: flex; justify-content: space-between">
    <div style="font-weight: bold; color: #50c878;">
        Discount:
    </div>
    <div style="color: #50c878;">
        ₹${order.discount}
    </div>
</div>
<div style="display: flex; justify-content: space-between">
    <div style="font-weight: bold">
        Order Total:
    </div>
    <div style="font-weight: bold">
        ₹${order.totalPrice}
    </div>
</div>

  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">

  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">

  <div class="v-color v-text-align v-line-height" style="line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 11px; line-height: 15.4px;">Thank You for purchasing with us.</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>
`;
	}

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
								{!order.isPaid && order.paymentMethod === "Online" ? (
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
													// merchantId: "12345678901234567890",
													merchantName: "THUNDER - Sweat in Style",
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
								) : (
									<>
										{!order.isConfirmed ? (
											<form onSubmit={confirmOrder}>
												<input
													type="hidden"
													name="subject"
													value="Order Confirmed"
												/>

												<input
													type="hidden"
													name="receiver"
													value={userInfo.email}
												/>

												<input
													type="hidden"
													name="message"
													value={email_message}
												/>
												<input
													className="primary"
													type="submit"
													value="Confirm Order"
												/>

												{/* <button onClick={confirmOrder} type="button"></button> */}
											</form>
										) : (
											<div className="container-a alert-info">
												Your order is confirmed.
											</div>
										)}
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
