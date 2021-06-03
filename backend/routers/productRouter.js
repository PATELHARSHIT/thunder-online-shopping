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
			gender: "male",
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

productRouter.put(
	"/:id",
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const productId = req.params.id;
		const product = await Product.findById(productId);
		if (product) {
			product.name = req.body.name;
			product.image = req.body.image;
			product.brand = req.body.brand;
			product.edition = req.body.edition;
			product.category = req.body.category;
			product.description = {
				desc: req.body.desc,
				material: {
					title: req.body.materialTitle,
					subtitle: req.body.materialSubTitle,
				},
				fit: {
					title: req.body.fitTitle,
					subtitle: req.body.fitSubTitle,
				},
			};
			product.price = req.body.price;
			product.discount = req.body.discount;
			product.sizeInStock = req.body.sizeInStock;
			product.countInStock = req.body.countInStock;
			product.gender = req.body.gender;
			const updatedProduct = await product.save();
			res.send({ message: "Product Updated", product: updatedProduct });
		} else {
			res.status(404).send({ message: "Product Not Found" });
		}
	})
);

export default productRouter;
