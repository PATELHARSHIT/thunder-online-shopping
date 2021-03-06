import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
	createProduct,
	deleteProduct,
	listProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Title from "../components/Title";
import {
	PRODUCT_CREATE_RESET,
	PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

function ProductListScreen(props) {
	const { pageNumber = 1 } = useParams();

	const productList = useSelector(state => state.productList);
	const { loading, error, products, page, pages } = productList;

	const productCreate = useSelector(state => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	const productDelete = useSelector(state => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const dispatch = useDispatch();
	useEffect(() => {
		if (successCreate) {
			dispatch({ type: PRODUCT_CREATE_RESET });
			props.history.push(`product/${createdProduct._id}/edit`);
		}
		if (successDelete) {
			dispatch({ type: PRODUCT_DELETE_RESET });
		}
		dispatch(listProducts({ pageNumber }));
	}, [
		createdProduct,
		dispatch,
		props.history,
		successCreate,
		successDelete,
		pageNumber,
	]);

	const deleteHandler = product => {
		// TODO: dispatch delete action
		if (window.confirm("Are you sure to delete?")) {
			dispatch(deleteProduct(product._id));
		}
	};

	const createHandler = () => {
		dispatch(createProduct());
	};

	return (
		<div>
			<Title title="Products" />
			<div className="row" style={{ marginBottom: 20, float: "right" }}>
				<button type="button" className="primary" onClick={createHandler}>
					CREATE PRODUCT
				</button>
			</div>
			{loadingCreate && <LoadingBox></LoadingBox>}
			{errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
			{loadingDelete && <LoadingBox></LoadingBox>}
			{errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<>
					<table className="table">
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th>EDITION</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody>
							{products.map(product => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>{product.edition}</td>
									<td>
										<button
											className="small"
											onClick={() => {
												props.history.push(`/product/${product._id}/edit`);
											}}
										>
											Edit
										</button>
										<button
											type="button"
											className="small"
											onClick={() => deleteHandler(product)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="row center pagination">
						{[...Array(pages).keys()].map(x => (
							<Link
								className={x + 1 === page ? "active" : ""}
								key={x + 1}
								to={`/productlist/pageNumber/${x + 1}`}
							>
								{x + 1}
							</Link>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default ProductListScreen;
