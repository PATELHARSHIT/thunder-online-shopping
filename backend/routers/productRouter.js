import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
	"/",
	expressAsyncHandler(async (req, res) => {
		const products = await Product.find({});
		res.send(products);
	})
);

productRouter.post(
	"/",
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const product = new Product({
			name: "Sample Product " + Date.now(),
			image: "/images/p1.jpg",
			brand: "Sample XXX",
			edition: "Sample XXX",
			category: "Sample XXX",
			description: {
				desc: "Sample Description",
				material: {
					title: "Sample Title",
					subtitle: "Sample Subtitle",
				},
				fit: {
					title: "REGULAR",
					subtitle: "Fits just right - not too tight, not too loose.",
				},
			},
			price: 0,
			discount: 0,
			countInStock: 0,
			rating: 0,
			numReviews: 0,
		});
		const createdProduct = await product.save();
		res.send({ message: "Product Created", product: createdProduct });
	})
);

productRouter.get(
	"/seed",
	expressAsyncHandler(async (req, res) => {
		await Product.remove({});
		const createdProducts = await Product.insertMany(data.products);
		res.send({ createdProducts });
	})
);

productRouter.get(
	"/:id",
	expressAsyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);
		if (product) {
			res.send(product);
		} else {
			res.status(404).send({ message: "Product Not Found" });
		}
	})
);

export default productRouter;
