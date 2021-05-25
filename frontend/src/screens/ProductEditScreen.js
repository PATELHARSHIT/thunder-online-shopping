import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function ProductEditScreen(props) {
	const productId = props.match.params.id;

	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [edition, setEdition] = useState("");
	const [category, setCategory] = useState("");
	const [desc, setDesc] = useState("");
	const [materialTitle, setMaterialTitle] = useState("");
	const [materialSubTitle, setMaterialSubTitle] = useState("");
	const [fitTitle, setFitTitle] = useState("");
	const [fitSubTitle, setFitSubTitle] = useState("");
	const [price, setPrice] = useState("");
	const [discount, setDiscount] = useState("");
	const [sizeqty, setSizeqty] = useState("");
	const [countInStock, setCountInStock] = useState([]);

	const productDetails = useSelector(state => state.productDetails);
	const { loading, error, product } = productDetails;
	const dispatch = useDispatch();

	useEffect(() => {
		if (!product || product._id !== productId) {
			dispatch(detailsProduct(productId));
		} else {
		}
	}, [product, dispatch, productId]);

	const submitHandler = e => {
		e.preventDefault();
		// TODO: dispatch update product
	};

	const handleSizeQty = () => {
		if (sizeqty) {
			let [size, qty] = sizeqty.split("-");
			setCountInStock(prevCountInStock => [...prevCountInStock, { size, qty }]);
		}
	};

	return (
		<div>
			<form className="form edit" onSubmit={submitHandler}>
				<div>
					<h1>Edit Product {productId}</h1>
				</div>
				{loading ? (
					<LoadingBox />
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<>
						<div>
							<label htmlFor="name">Name</label>
							<input
								id="name"
								type="text"
								placeholder="Enter Name"
								value={name}
								onChange={e => setName(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="brand">Brand</label>
							<input
								id="brand"
								type="text"
								placeholder="Enter Brand"
								value={brand}
								onChange={e => setBrand(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="edition">Edition</label>
							<input
								id="edition"
								type="text"
								placeholder="Enter Edition"
								value={edition}
								onChange={e => setEdition(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="category">Category</label>
							<input
								id="category"
								type="text"
								placeholder="Enter Category"
								value={category}
								onChange={e => setCategory(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="image">Image</label>
							<input
								id="image"
								type="text"
								placeholder="Enter Image"
								value={image}
								onChange={e => setImage(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="price">Price</label>
							<input
								id="price"
								type="text"
								placeholder="Enter Price"
								value={price}
								onChange={e => setPrice(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="discount">Discount</label>
							<input
								id="discount"
								type="text"
								placeholder="Enter Discount"
								value={discount}
								onChange={e => setDiscount(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="desc">Description</label>
							<textarea
								id="desc"
								rows="3"
								type="text"
								placeholder="Enter Description"
								value={desc}
								onChange={e => setDesc(e.target.value)}
							></textarea>
						</div>

						<div>
							<label htmlFor="materialTitle">Material Title</label>
							<input
								id="materialTitle"
								type="text"
								placeholder="Enter Material Title"
								value={materialTitle}
								onChange={e => setMaterialTitle(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="materialSubTitle">Material Description</label>
							<textarea
								id="materialSubTitle"
								rows="3"
								type="text"
								placeholder="Enter Material Description"
								value={materialSubTitle}
								onChange={e => setMaterialSubTitle(e.target.value)}
							></textarea>
						</div>
						<div>
							<label htmlFor="fitTitle">Fit Title</label>
							<input
								id="fitTitle"
								type="text"
								placeholder="Enter Fit Title"
								value={fitTitle}
								onChange={e => setFitTitle(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="fitSubTitle">Fit Description</label>
							<textarea
								id="fitSubTitle"
								rows="3"
								type="text"
								placeholder="Enter Fit Description"
								value={fitSubTitle}
								onChange={e => setFitSubTitle(e.target.value)}
							></textarea>
						</div>

						<div>
							<label htmlFor="sizeqty">Size - Qty</label>
							<input
								id="sizeqty"
								type="text"
								placeholder="Enter Size & Qty (e.g M-10)"
								value={sizeqty}
								onChange={e => setSizeqty(e.target.value)}
							></input>
							<div
								style={{
									display: "flex",
									justifyContent: "flex-start",
									marginTop: "1rem",
								}}
							>
								{countInStock &&
									countInStock.map(data => {
										return (
											<div className="sizeqty">
												{data.size} - {data.qty}
											</div>
										);
									})}
							</div>
							<button
								type="button"
								className="small"
								style={{
									width: "7rem",
									marginTop: "1rem",
									marginBottom: "2rem",
								}}
								onClick={handleSizeQty}
							>
								Add
							</button>
						</div>
						<div className="form-row">
							<label></label>
							<button
								style={{ width: "10rem", marginRight: "2rem" }}
								className="primary-border"
							>
								Back
							</button>
							<button
								style={{ width: "15rem" }}
								className="primary"
								type="submit"
							>
								Update
							</button>
						</div>
					</>
				)}
			</form>
		</div>
	);
}

export default ProductEditScreen;
