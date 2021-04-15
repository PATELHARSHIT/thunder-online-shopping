import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

function ProductScreen(props) {
	const productId = props.match.params.id;
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();
	const productDetails = useSelector(state => state.productDetails);

	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(detailsProduct(productId));
	}, [dispatch, productId]);

	const addToCartHandler = () => {
		props.history.push(`/cart/${productId}?qty=${qty}`);
	};

	return (
		<div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div className="row top product">
					<div className="col-2">
						<img className="large" src={product.image} alt={product.name} />
					</div>
					<div className="col-2">
						<ul>
							<li>
								<h1>{product.name}</h1>
							</li>
							<li>
								<Rating
									rating={product.rating}
									numReviews={product.numReviews}
								/>
							</li>
							<li>
								<span className="productscreen-price">
									<small>₹</small>
									{product.price}
								</span>
							</li>
							<li>
								<strong>
									Status:
									{product.countInStock > 0 ? (
										<span className="success">
											<strong> In Stock</strong>
										</span>
									) : (
										<span className="danger">
											<strong> Out of Stock</strong>
										</span>
									)}
								</strong>
							</li>
							<li>
								<strong>Description: </strong>
								<br />
								<span>{product.description}</span>
							</li>
							<br />
							{product.countInStock > 0 && (
								<>
									<li>
										<div className="select-drop">
											<span className="select-drop-font">Qty</span>
											<select
												name="Qty"
												value={qty}
												onChange={e => setQty(e.target.value)}
											>
												{[...Array(product.countInStock).keys()].map(item => (
													<option key={item + 1} value={item + 1}>
														{item + 1}
													</option>
												))}
											</select>
										</div>
										{/* </div> */}
									</li>
									<li>
										<button
											onClick={addToCartHandler}
											className="secondary block"
										>
											ADD TO BAG
										</button>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductScreen;
