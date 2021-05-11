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
			name: "Rapid Dry Trunk T-Shirt",
			category: "Shirts",
			image: "/images/t1.jpeg",
			price: 499,
			countInStock: 10,
			brand: "Thunder",
			rating: 4.5,
			numReviews: 10,
			edition: "Rise",
			discount: 10,
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
					"Go further and faster with the THUNDER Men's Running T-shirt. Designed with Rapid Dry and Anti microbial technology, it wicks away sweat and keeps body odor at bay so you have nothing to think about except how you're going to set a new personal best.",
				material: {
					title: "100% POLYSTER",
					subtitle: "Machine Wash",
				},
				fit: {
					title: "REGULAR",
					subtitle: "Fits just right - not too tight, not too loose.",
				},
			},
		},
		{
			name: "Rise Printed Tshirt",
			category: "Shirts",
			image: "/images/t2.jpeg",
			price: 599,
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
			name: "Rise Grey Tshirt",
			category: "Shirts",
			image: "/images/t3.jpeg",
			price: 709,
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
			name: "Unstoppable T-Shirt",
			category: "Shirts",
			image: "/images/t4.jpeg",
			price: 699,
			countInStock: 15,
			sizeInStock: [
				{ size: "XS", qty: 3 },
				{ size: "S", qty: 3 },
				{ size: "M", qty: 5 },
				{ size: "L", qty: 0 },
				{ size: "XL", qty: 4 },
				{ size: "XXL", qty: 0 },
			],
			brand: "Thunder",
			rating: 4.5,
			numReviews: 14,
			edition: "Unstoppable",
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
			name: "Thunder White T-Shirt",
			category: "Shirts",
			image: "/images/w3.jpeg",
			price: 859,
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
			name: "Unstoppable Trunk",
			category: "Shirts",
			image: "/images/t5.jpeg",
			price: 899,
			countInStock: 5,
			sizeInStock: [
				{ size: "XS", qty: 1 },
				{ size: "S", qty: 1 },
				{ size: "M", qty: 1 },
				{ size: "L", qty: 1 },
				{ size: "XL", qty: 1 },
				{ size: "XXL", qty: 0 },
			],
			brand: "Thunder",
			rating: 4.5,
			numReviews: 10,
			edition: "Unstoppable",
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
