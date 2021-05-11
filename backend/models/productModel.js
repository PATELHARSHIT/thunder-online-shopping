import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		image: { type: String, required: true },
		brand: { type: String, required: true },
		edition: { type: String, required: true },
		category: { type: String, required: true },
		description: {
			desc: { type: String },
			material: { type: Object },
			fit: { type: Object },
		},
		price: { type: Number, required: true },
		discount: { type: Number, required: true, default: 0 },
		countInStock: { type: Number, required: true },
		rating: { type: Number, required: true },
		numReviews: { type: Number, required: true },
		sizeInStock: [{ size: { type: String }, qty: { type: Number } }],
	},
	{
		timestamps: true,
	}
);
const Product = mongoose.model("Product", productSchema);

export default Product;
