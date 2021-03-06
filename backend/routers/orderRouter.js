import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get(
	"/",
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const orders = await Order.find().populate("user", "name");
		res.send(orders);
	})
);

orderRouter.get(
	"/summary",
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const orders = await Order.aggregate([
			{
				$group: {
					_id: null,
					numOrders: { $sum: 1 },
					totalSales: { $sum: "$totalPrice" },
				},
			},
		]);
		const users = await User.aggregate([
			{
				$group: {
					_id: null,
					numUsers: { $sum: 1 },
				},
			},
		]);
		const dailyOrders = await Order.aggregate([
			{
				$group: {
					_id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
					orders: { $sum: 1 },
					sales: { $sum: "$totalPrice" },
				},
			},
			{ $sort: { _id: 1 } },
		]);
		const productCategories = await Product.aggregate([
			{
				$group: {
					_id: "$category",
					count: { $sum: 1 },
				},
			},
		]);
		res.send({ users, orders, dailyOrders, productCategories });
	})
);

orderRouter.get(
	"/mine",
	isAuth,
	expressAsyncHandler(async (req, res) => {
		// console.log(req);
		const orders = await Order.find({ user: req.user._id });
		res.send(orders);
	})
);

orderRouter.post(
	"/",
	isAuth,
	expressAsyncHandler(async (req, res) => {
		if (req.body.orderItems.length === 0) {
			res.state(400).send({ message: "Cart is Empty" });
		} else {
			const order = new Order({
				orderItems: req.body.cartItems,
				shippingAddress: req.body.shippingAddress,
				paymentMethod: req.body.paymentMethod,
				itemsPrice: req.body.itemsPrice,
				shippingPrice: req.body.shippingPrice,
				taxPrice: req.body.taxPrice,
				totalPrice: req.body.totalPrice,
				discount: req.body.discount,
				user: req.user._id,
			});
			const createdOrder = await order.save();
			res
				.status(201)
				.send({ message: "New order created", order: createdOrder });
		}
	})
);

orderRouter.get(
	"/:id",
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id);
		if (order) {
			res.send(order);
		} else {
			res.status(404).send({ message: "Order Not Found" });
		}
	})
);

orderRouter.put(
	"/:id/pay",
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id);
		if (order) {
			order.isPaid = true;
			order.paidAt = Date.now();
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: Date.now(),
				email_address: req.body.email_address,
			};
			console.log("order", order);
			const updatedOrder = await order.save();
			res.send({ message: "Order Paid", order: updatedOrder });
		} else {
			res.status(404).send({ message: "Order Not Found" });
		}
	})
);

orderRouter.delete(
	"/:id",
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id);
		if (order) {
			const deleteOrder = await order.remove();
			res.send({ message: "Order Deleted", order: deleteOrder });
		} else {
			res.status(404).send({ message: "Order Not Found" });
		}
	})
);

orderRouter.put(
	"/:id/deliver",
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id);
		console.log(`order in deliver`, order);
		if (order) {
			order.isDelivered = true;
			order.deliveredAt = Date.now();

			console.log(`order in deliver updatted`, order);

			try {
				const updatedOrder = await order.save();
				console.log(`updatedOrder`, updatedOrder);
				res.send({ message: "Order Delivered", order: updatedOrder });
			} catch (error) {
				console.log(`error.message`, error.message);
			}
		} else {
			res.status(404).send({ message: "Order Not Found" });
		}
	})
);

export default orderRouter;
