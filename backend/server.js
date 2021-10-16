import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import path from "path";
import cors from "cors";
import nodemailer from "nodemailer";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/thunder", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.post("/send_email", cors(), async (req, res) => {
	// const user = await User.findById(order.user);
	const o = await Order.findById(req.body.order._id);
	console.log(req.body.order._id, o);

	o.isConfirmed = true;
	const newOrder = await o.save();
	res.status(200).send({ order: newOrder });

	// 	const transport = nodemailer.createTransport({
	// 		host: process.env.MAIL_HOST,
	// 		port: process.env.MAIL_PORT,
	// 		auth: {
	// 			user: process.env.MAIL_USER,
	// 			pass: process.env.MAIL_PASS,
	// 		},
	// 	});

	// 	await transport.sendMail({
	// 		from: process.env.MAIL_FROM,
	// 		to: user.email,
	// 		subject: "THUNDER - Order Confirmation",
	// 		html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	// <html xmlns="http://www.w3.org/1999/xhtml">

	// <head>
	//   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	//   <title>Email Template for Order Confirmation Email</title>

	//   <!-- Start Common CSS -->
	//   <style type="text/css">
	//     #outlook a {
	//       padding: 0;
	//     }

	//     body {
	//       width: 100% !important;
	//       -webkit-text-size-adjust: 100%;
	//       -ms-text-size-adjust: 100%;
	//       margin: 0;
	//       padding: 0;
	//       font-family: Helvetica, arial, sans-serif;
	//     }

	//     .ExternalClass {
	//       width: 100%;
	//     }

	//     .ExternalClass,
	//     .ExternalClass p,
	//     .ExternalClass span,
	//     .ExternalClass font,
	//     .ExternalClass td,
	//     .ExternalClass div {
	//       line-height: 100%;
	//     }

	//     .backgroundTable {
	//       margin: 0;
	//       padding: 0;
	//       width: 100% !important;
	//       line-height: 100% !important;
	//     }

	//     .main-temp table {
	//       border-collapse: collapse;
	//       mso-table-lspace: 0pt;
	//       mso-table-rspace: 0pt;
	//       font-family: Helvetica, arial, sans-serif;
	//     }

	//     .main-temp table td {
	//       border-collapse: collapse;
	//     }
	//   </style>
	//   <!-- End Common CSS -->
	// </head>

	// <body>
	//   <table width="100%" cellpadding="0" cellspacing="0" border="0" class="backgroundTable main-temp"
	//     style="background-color: #d5d5d5;">
	//     <tbody>
	//       <tr>
	//         <td>
	//           <table width="600" align="center" cellpadding="15" cellspacing="0" border="0" class="devicewidth"
	//             style="background-color: #ffffff;">
	//             <tbody>
	//               <!-- Start header Section -->
	//               <tr>
	//                 <td style="padding-top: 30px;">
	//                   <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner"
	//                     style="border-bottom: 1px solid #eeeeee; text-align: center;">
	//                     <tbody>

	//                       <tr>
	//                         <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 25px;">
	//                           <strong>Order Number:</strong> #${
	// 														order._id
	// 													} | <strong>Order Date:</strong> ${order.createdAt
	// 			.toString()
	// 			.substring(0, 10)}
	//                         </td>
	//                       </tr>
	//                     </tbody>
	//                   </table>
	//                 </td>
	//               </tr>
	//               <!-- End header Section -->

	//               <!-- Start address Section -->
	//               <tr>
	//                 <td style="padding-top: 0;">
	//                   <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner"
	//                     style="border-bottom: 1px solid #bbbbbb;">
	//                     <tbody>
	//                       <tr>
	//                         <td
	//                           style="width: 55%; font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;">
	//                           Delivery Adderss
	//                         </td>
	//                         <td
	//                           style="width: 45%; font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;">
	//                           Billing Address
	//                         </td>
	//                       </tr>
	//                       <tr>
	//                         <td style="width: 55%; font-size: 14px; line-height: 18px; color: #666666;">
	//                           ${order.shippingAddress.fullName}
	//                         </td>
	//                         <td style="width: 45%; font-size: 14px; line-height: 18px; color: #666666;">
	//                           ${order.shippingAddress.fullName}
	//                         </td>
	//                       </tr>
	//                       <tr>
	//                         <td style="width: 55%; font-size: 14px; line-height: 18px; color: #666666;">
	//                           ${order.shippingAddress.address}
	//                         </td>
	//                         <td style="width: 45%; font-size: 14px; line-height: 18px; color: #666666;">
	//                           ${order.shippingAddress.address}
	//                         </td>
	//                       </tr>
	//                       <tr>
	//                         <td
	//                           style="width: 55%; font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px;">
	//                           ${order.shippingAddress.city}, ${
	// 			order.shippingAddress.country
	// 		}, ${order.shippingAddress.postalCode}
	//                         </td>
	//                         <td
	//                           style="width: 45%; font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px;">
	//                           ${order.shippingAddress.city}, ${
	// 			order.shippingAddress.country
	// 		}, ${order.shippingAddress.postalCode}
	//                         </td>
	//                       </tr>
	//                     </tbody>
	//                   </table>
	//                 </td>
	//               </tr>
	//               <!-- End address Section -->
	// 							<hr/>
	// 							<tr>
	//                         <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 25px;">
	//                           <strong>Payment Method:</strong> #${
	// 														order.paymentMethod
	// 													}
	//                         </td>
	//                       </tr>
	// 							<hr/>
	//               <!-- Start product Section -->

	//               ${order.orderItems.map(
	// 								item => `
	//               <tr>
	//                 <td style="padding-top: 0;">
	//                   <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner"
	//                     style="border-bottom: 1px solid #eeeeee;">
	//                     <tbody>
	//                       <tr>

	//                         <td colspan="2"
	//                           style="font-size: 14px; font-weight: bold; color: #666666; padding-bottom: 5px;">
	//                           ${item.productname}
	//                         </td>
	//                       </tr>
	//                       <tr>
	//                         <td style="font-size: 14px; line-height: 18px; color: #757575; width: 440px;">
	//                           Quantity: ${item.qty}
	//                         </td>
	//                         <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right;">
	//                           ₹${item.price} Per Unit
	//                         </td>
	//                       </tr>
	//                       <tr>
	//                         <td style="font-size: 14px; line-height: 18px; color: #757575; padding-bottom: 10px;">
	//                           Size: ${item.size}
	//                         </td>
	//                         <td
	//                           style="font-size: 14px; line-height: 18px; color: #757575; text-align: right; padding-bottom: 10px;">
	//                           <b style="color: #666666;">₹${
	// 														item.qty * item.price
	// 													}</b> Total
	//                         </td>
	//                       </tr>
	//                     </tbody>
	//                   </table>
	//                 </td>
	//               </tr>
	//               `
	// 							)}
	//               <!-- End product Section -->

	//               <!-- Start calculation Section -->
	//               <tr>
	//                 <td style="padding-top: 0;">
	//                   <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner"
	//                     style="border-bottom: 1px solid #bbbbbb; margin-top: -5px;">
	//                     <tbody>
	//                       <tr>
	//                         <td rowspan="5" style="width: 55%;"></td>
	//                         <td style="font-size: 14px; line-height: 18px; color: #666666;">
	//                           Sub-Total:
	//                         </td>
	//                         <td
	//                           style="font-size: 14px; line-height: 18px; color: #666666; width: 130px; text-align: right;">
	//                           ₹${order.itemsPrice}
	//                         </td>
	//                       </tr>
	//                       <tr>
	//                         <td
	//                           style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; border-bottom: 1px solid #eeeeee;">
	//                           Shipping Fee:
	//                         </td>
	//                         <td
	//                           style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; border-bottom: 1px solid #eeeeee; text-align: right;">
	//                           ₹${order.shippingPrice}
	//                         </td>
	//                       </tr>
	//                       <tr>
	//                         <td
	//                           style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; padding-top: 10px; border-bottom: 1px solid #eeeeee;">
	//                           Tax:
	//                         </td>
	//                         <td
	//                           style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; padding-top: 10px; border-bottom: 1px solid #eeeeee; text-align: right;">
	//                           ₹${order.taxPrice}
	//                         </td>
	//                       </tr>
	//               </tr>
	//               <tr>
	//                 <td
	//                   style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; padding-top: 10px; border-bottom: 1px solid #eeeeee;">
	//                   Discount:
	//                 </td>
	//                 <td
	//                   style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; padding-top: 10px; border-bottom: 1px solid #eeeeee; text-align: right;">
	//                   ₹${order.discount}
	//                 </td>
	//               </tr>
	//               <tr>
	//                 <td
	//                   style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-bottom: 10px; padding-top: 10px; border-bottom: 1px solid #eeeeee;">
	//                   Order Total:
	//                 </td>
	//                 <td
	//                   style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; padding-top: 10px; border-bottom: 1px solid #eeeeee; text-align: right;">
	//                   ₹${order.totalPrice}
	//                 </td>
	//               </tr>
	//             </tbody>
	//           </table>
	//         </td>
	//       </tr>
	//       <!-- End calculation Section -->

	//     </tbody>
	//   </table>
	//   </td>
	//   </tr>
	//   </tbody>
	//   </table>
	// </body>

	// </html>

	//     `,
	// });
});

app.get("/", (req, res) => {
	res.send("Server is Ready.");
});

app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Serve at http://localhost:5000");
});
