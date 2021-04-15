import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
	return (
		<div key={product._id} className="card">
			<Link to={`/product/${product._id}`}>
				<img className="medium" src={product.image} alt={product.name} />
			</Link>
			<div className="card-body">
				<Link to={`/product/${product._id}`}>
					<p>{product.name}</p>
				</Link>
				<Rating rating={product.rating} numReviews={product.numReviews} />
				<p className="price">
					<strong>
						<small>₹</small>
						{product.price}
					</strong>
				</p>
			</div>
		</div>
	);
}

export default Product;
