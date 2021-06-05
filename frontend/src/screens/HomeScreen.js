import React, { useEffect } from "react";
import Edition from "../components/Edition";
import Product from "../components/Product";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Title from "../components/Title";

function HomeScreen() {
	const dispatch = useDispatch();
	const productList = useSelector(state => state.productList);

	const { loading, error, products } = productList;

	var count = 5;
	useEffect(() => {
		dispatch(listProducts({}));
	}, [dispatch]);
	return (
		<div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div>
					<Edition />
					<Title title="Products"></Title>
					<div>
						<div className="row space-even">
							{products.map(
								product =>
									count-- > 0 && <Product key={product._id} product={product} />
							)}
						</div>
						<br />
						<a className="col primary" href="/search/name/all">
							<b>View All</b>
						</a>
					</div>
					<br />
					<br />
				</div>
			)}
		</div>
	);
}

export default HomeScreen;
