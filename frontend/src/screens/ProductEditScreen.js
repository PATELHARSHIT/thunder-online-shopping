import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import Axios from "axios";

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
	const [sizeInStock, setSizeInStock] = useState([]);
	const [countInStock, setCountInStock] = useState("");
	const [gender, setGender] = useState("male");

	const productDetails = useSelector(state => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector(state => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	const dispatch = useDispatch();

	useEffect(() => {
		if (successUpdate) {
			props.history.push("/productlist");
		}

		if (!product || product._id !== productId || successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			dispatch(detailsProduct(productId));
		} else {
			setName(product.name);
			setPrice(product.price);
			setImage(product.image);
			setCategory(product.category);
			setSizeInStock(product.sizeInStock);
			setCountInStock(product.countInStock);
			setBrand(product.brand);
			setDesc(product.description.desc);
			setMaterialTitle(product.description.material.title);
			setMaterialSubTitle(product.description.material.subtitle);
			setFitTitle(product.description.fit.title);
			setFitSubTitle(product.description.fit.subtitle);
			setEdition(product.edition);
			setDiscount(product.discount);
			setGender(product.gender);
		}
	}, [product, dispatch, productId, successUpdate, props.history]);

	const submitHandler = e => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				image,
				brand,
				edition,
				category,
				desc,
				materialTitle,
				materialSubTitle,
				fitTitle,
				fitSubTitle,
				price,
				discount,
				sizeInStock,
				countInStock,
				gender,
			})
		);
	};

	const handleSizeQty = () => {
		if (sizeqty) {
			let [size, qty] = sizeqty.split("-");
			setSizeInStock(prevCountInStock => [...prevCountInStock, { size, qty }]);
		}
	};

	const [loadingUpload, setLoadingUpload] = useState(false);
	const [errorUpload, setErrorUpload] = useState("");

	const userSignIn = useSelector(state => state.userSignIn);
	const { userInfo } = userSignIn;

	const uploadFileHandler = async e => {
		const file = e.target.files[0];
		const bodyFormData = new FormData();
		bodyFormData.append("image", file);
		setLoadingUpload(true);

		try {
			const { data } = await Axios.post("/api/uploads", bodyFormData, {
				headers: {
					"Content-Type": "multipart/form-data",
					authorization: `Bearer ${userInfo.token}`,
				},
			});

			console.log("data: ", data);
			setImage(data);
			setLoadingUpload(false);
		} catch (error) {
			setErrorUpload(error.message);
			setLoadingUpload(false);
		}
	};

	return (
		<div>
			<form className="form edit" onSubmit={submitHandler}>
				<div>
					<h1>Edit Product {productId}</h1>
				</div>
				{loadingUpdate && <LoadingBox></LoadingBox>}
				{errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
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
							<label htmlFor="gender">Gender</label>
							<input
								id="gender"
								type="text"
								placeholder="Enter Gender"
								value={gender}
								onChange={e => setGender(e.target.value)}
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
							<label htmlFor="imageFile">Image File</label>
							<input
								type="file"
								id="imageFile"
								label="Choose Image"
								onChange={uploadFileHandler}
							></input>
							{loadingUpload && <LoadingBox></LoadingBox>}
							{errorUpload && (
								<MessageBox variant="danger">{errorUpload}</MessageBox>
							)}
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
							<label htmlFor="countInStock">Stock Count</label>
							<input
								id="countInStock"
								type="text"
								placeholder="Enter Stock Count"
								value={countInStock}
								onChange={e => setCountInStock(e.target.value)}
							></input>
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
								{sizeInStock.length > 0 &&
									sizeInStock.map(data => {
										return (
											<div key={data.size} className="sizeqty">
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
								onClick={submitHandler}
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
