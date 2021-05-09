import bcrypt from "bcryptjs";

const data = {
	users: [
		{
			name: "HarshitSP",
			email: "admin@example.com",
			password: bcrypt.hashSync("1234", 8),
			isAdmin: true,
		},
		{
			name: "John",
			email: "user@example.com",
			password: bcrypt.hashSync("1234", 8),
			isAdmin: false,
		},
	],
	products: [
		{
			name: "Rise Black Tshirt",
			category: "Shirts",
			image: "/images/p1.jpg",
			price: 1299,
			countInStock: 10,
			brand: "Thunder",
			rating: 4.5,
			numReviews: 10,
			edition: "Rise",
			discount: 25,
			sizeInStock: [
				{ size: "XS", qty: 3 },
				{ size: "S", qty: 0 },
				{ size: "M", qty: 5 },
				{ size: "L", qty: 2 },
				{ size: "XL", qty: 0 },
				{ size: "XXL", qty: 0 },
			],
			description: {
				desc:
					"Experience the most Premium Blue with this Men's Indigo AOP Full Sleeves Shirt from our Timeless Indigo Collection. Team this shirt with a pair of trousers, loafers and wayfarers for a smart casual look.",
				material: {
					title: "100% COTTEN",
					subtitle:
						"Classic, lightweight jersey fabric comprising 100% cotton.",
				},
			},
		},
		{
			name: "Rise White Tshirt",
			category: "Shirts",
			image: "/images/p2.jpg",
			price: 1999,
			countInStock: 20,
			brand: "Thunder",
			rating: 5.0,
			numReviews: 10,
			edition: "Rise",
			discount: 10,
			sizeInStock: [
				{ size: "XS", qty: 3 },
				{ size: "S", qty: 3 },
				{ size: "M", qty: 5 },
				{ size: "L", qty: 2 },
				{ size: "XL", qty: 4 },
				{ size: "XXL", qty: 3 },
			],
			description: {
				desc:
					"Experience the most Premium Blue with this Men's Indigo AOP Full Sleeves Shirt from our Timeless Indigo Collection. Team this shirt with a pair of trousers, loafers and wayfarers for a smart casual look.",
				material: {
					title: "100% COTTEN",
					subtitle:
						"Classic, lightweight jersey fabric comprising 100% cotton.",
				},
				fit: {
					title: "REGULAR",
					subtitle: "Fits just right - not too tight, not too loose.",
				},
			},
		},
		{
			name: "Rise Stripes Tshirt",
			category: "Shirts",
			image: "/images/p3.jpg",
			price: 2209,
			countInStock: 0,
			brand: "Thunder",
			rating: 4.8,
			numReviews: 17,
			sizeInStock: [
				{ size: "XS", qty: 0 },
				{ size: "S", qty: 0 },
				{ size: "M", qty: 0 },
				{ size: "L", qty: 0 },
				{ size: "XL", qty: 0 },
				{ size: "XXL", qty: 0 },
			],
			edition: "Rise",
			discount: 0,
			description: {
				desc:
					"Experience the most Premium Blue with this Men's Indigo AOP Full Sleeves Shirt from our Timeless Indigo Collection. Team this shirt with a pair of trousers, loafers and wayfarers for a smart casual look.",
				material: {
					title: "100% COTTEN",
					subtitle:
						"Classic, lightweight jersey fabric comprising 100% cotton.",
				},
				fit: {
					title: "REGULAR",
					subtitle: "Fits just right - not too tight, not too loose.",
				},
			},
		},
		{
			name: "Nike Slim Pant",
			category: "Pants",
			image: "/images/p4.jpg",
			price: 2999,
			countInStock: 15,
			sizeInStock: [
				{ size: "XS", qty: 3 },
				{ size: "S", qty: 3 },
				{ size: "M", qty: 5 },
				{ size: "L", qty: 0 },
				{ size: "XL", qty: 4 },
				{ size: "XXL", qty: 0 },
			],
			brand: "Nike",
			rating: 4.5,
			numReviews: 14,
			edition: "Rise",
			discount: 15,
			description: {
				desc:
					"Experience the most Premium Blue with this Men's Indigo AOP Full Sleeves Shirt from our Timeless Indigo Collection. Team this shirt with a pair of trousers, loafers and wayfarers for a smart casual look.",
				material: {
					title: "100% COTTEN",
					subtitle:
						"Classic, lightweight jersey fabric comprising 100% cotton.",
				},
				fit: {
					title: "REGULAR",
					subtitle: "Fits just right - not too tight, not too loose.",
				},
			},
		},
		{
			name: "Puma Slim Pant",
			category: "Pants",
			image: "/images/p5.jpg",
			price: 3999,
			countInStock: 5,
			sizeInStock: [
				{ size: "XS", qty: 1 },
				{ size: "S", qty: 1 },
				{ size: "M", qty: 1 },
				{ size: "L", qty: 1 },
				{ size: "XL", qty: 1 },
				{ size: "XXL", qty: 0 },
			],
			brand: "Puma",
			rating: 4.5,
			numReviews: 10,
			edition: "Rise",
			discount: 20,
			description: {
				desc:
					"Experience the most Premium Blue with this Men's Indigo AOP Full Sleeves Shirt from our Timeless Indigo Collection. Team this shirt with a pair of trousers, loafers and wayfarers for a smart casual look.",
				material: {
					title: "100% COTTEN",
					subtitle:
						"Classic, lightweight jersey fabric comprising 100% cotton.",
				},
				fit: {
					title: "REGULAR",
					subtitle: "Fits just right - not too tight, not too loose.",
				},
			},
		},
		{
			name: "Thunder Black Pant",
			category: "Pants",
			image: "/images/p1.jpg",
			price: 3339,
			countInStock: 0,
			brand: "Thunder",
			rating: 4.5,
			numReviews: 15,
			sizeInStock: [
				{ size: "XS", qty: 0 },
				{ size: "S", qty: 0 },
				{ size: "M", qty: 0 },
				{ size: "L", qty: 0 },
				{ size: "XL", qty: 0 },
				{ size: "XXL", qty: 0 },
			],
			edition: "Thunder",
			discount: 20,
			description: {
				desc:
					"Experience the most Premium Blue with this Men's Indigo AOP Full Sleeves Shirt from our Timeless Indigo Collection. Team this shirt with a pair of trousers, loafers and wayfarers for a smart casual look.",
				material: {
					title: "100% COTTEN",
					subtitle:
						"Classic, lightweight jersey fabric comprising 100% cotton.",
				},
			},
		},
		{
			name: "TT2",
			category: "Pants",
			image: "/images/p1.jpg",
			price: 3339,
			countInStock: 0,
			sizeInStock: [
				{ size: "XS", qty: 0 },
				{ size: "S", qty: 0 },
				{ size: "M", qty: 0 },
				{ size: "L", qty: 0 },
				{ size: "XL", qty: 0 },
				{ size: "XXL", qty: 0 },
			],
			brand: "Thunder",
			rating: 4.5,
			numReviews: 15,
			edition: "Thunder",
			discount: 20,
			description: {
				desc:
					"Experience the most Premium Blue with this Men's Indigo AOP Full Sleeves Shirt from our Timeless Indigo Collection. Team this shirt with a pair of trousers, loafers and wayfarers for a smart casual look.",
				material: {
					title: "100% COTTEN",
					subtitle:
						"Classic, lightweight jersey fabric comprising 100% cotton.",
				},
				fit: {
					title: "REGULAR",
					subtitle: "Fits just right - not too tight, not too loose.",
				},
			},
		},
	],
};
export default data;
