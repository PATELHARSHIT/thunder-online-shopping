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
					<b>
						<p>{product.brand}</p>
					</b>
				</Link>
				<span>{product.name}</span>
				<Rating rating={product.rating} numReviews={product.numReviews} />
				<div className="row">
					<p className="price">
						<b>
							₹
							{Math.round(
								product.price - (product.discount * product.price) / 100
							)}
						</b>
						{product.discount > 0 && (
							<strike className="pad1">₹{product.price}</strike>
						)}
					</p>
					<div className="row primary">
						{product.discount > 0 && (
							<small>
								<strong>{product.discount}%</strong>
							</small>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Product;
