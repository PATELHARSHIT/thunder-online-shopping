import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { prices, ratings } from "../utils";

function SearchScreen(props) {
	const {
		name = "all",
		category = "all",
		edition = "all",
		gender = "all",
		min = 0,
		max = 0,
		rating = 0,
		order = "newest",
	} = useParams();
	const dispatch = useDispatch();
	const productList = useSelector(state => state.productList);
	const { loading, error, products } = productList;

	const productEditionList = useSelector(state => state.productEditionList);
	const {
		loading: loadingEditions,
		error: errorEditions,
		editions,
	} = productEditionList;
	const productCategoryList = useSelector(state => state.productCategoryList);
	const {
		loading: loadingCategories,
		error: errorCategories,
		categories,
	} = productCategoryList;

	useEffect(() => {
		dispatch(
			listProducts({
				name: name !== "all" ? name : "",
				category: category !== "all" ? category : "",
				edition: edition !== "all" ? edition : "",
				gender: gender !== "all" ? gender : "",
				min,
				max,
				rating,
				order,
			})
		);
	}, [category, dispatch, edition, gender, max, min, name, order, rating]);

	const getFilterUrl = filter => {
		const filterCategory = filter.category || category;
		const filterName = filter.name || name;
		const filterEdition = filter.edition || edition;
		const filterGender = filter.gender || gender;
		const filterRating = filter.rating || rating;
		const sortOrder = filter.order || order;
		const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
		const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
		return `/search/category/${filterCategory}/name/${filterName}/edition/${filterEdition}/gender/${filterGender}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
	};
	return (
		<div>
			<div>
				<div className="row top">
					<div
						className="col-1 searchscreen"
						style={{ marginTop: "4rem", marginLeft: "2rem" }}
					>
						<div
							style={{
								display: "flex",
								marginBottom: "1rem",
								marginLeft: "-2rem",
							}}
						>
							<b
								style={{
									fontSize: "2.6rem",
									fontWeight: "600",
								}}
							>
								{gender === "male"
									? category === "all"
										? "Men"
										: "Men's"
									: gender === "female"
									? category === "all"
										? "Women"
										: "Women's"
									: ""}{" "}
								{category !== "all" ? category : "Clothing"}
							</b>
							<b
								style={{
									marginLeft: "1rem",
									fontSize: "2.6rem",
									fontWeight: "400",
									color: "#6c757d",
								}}
							>
								({products ? products.length : 0})
							</b>
						</div>
						<div
							style={{
								border: "1px solid #f95b5b",
								width: "35%",
								marginLeft: "-1.8rem",
							}}
						></div>

						<div style={{ marginTop: "3rem" }}>
							<small>FILTERS</small>
						</div>

						<div>
							<h3>Categories</h3>
							{loadingCategories ? (
								<LoadingBox></LoadingBox>
							) : errorCategories ? (
								<MessageBox variant="danger">{errorCategories}</MessageBox>
							) : (
								<ul>
									<li>
										<Link
											className={"all" === category ? "active" : ""}
											to={getFilterUrl({ category: "all" })}
										>
											Any
										</Link>
									</li>
									{categories.map(c => (
										<li key={c}>
											<Link
												className={c === category ? "active" : ""}
												to={getFilterUrl({ category: c })}
											>
												{c}
											</Link>
										</li>
									))}
								</ul>
							)}
						</div>
						<div>
							<h3>Editions</h3>
							{loadingEditions ? (
								<LoadingBox></LoadingBox>
							) : errorEditions ? (
								<MessageBox variant="danger">{errorEditions}</MessageBox>
							) : (
								<ul>
									<li>
										<Link
											className={"all" === edition ? "active" : ""}
											to={getFilterUrl({ edition: "all" })}
										>
											Any
										</Link>
									</li>
									{editions.map(e => (
										<li key={e}>
											<Link
												className={e === edition ? "active" : ""}
												to={getFilterUrl({ edition: e })}
											>
												{e}
											</Link>
										</li>
									))}
								</ul>
							)}
						</div>
						<div>
							<h3>Gender</h3>
							<ul>
								<li>
									<Link
										className={gender === "all" ? "active" : ""}
										to={getFilterUrl({ gender: "all" })}
									>
										Both
									</Link>
								</li>
								<li>
									<Link
										className={gender === "male" ? "active" : ""}
										to={getFilterUrl({ gender: "male" })}
									>
										Men
									</Link>
								</li>
								<li>
									<Link
										className={gender === "female" ? "active" : ""}
										to={getFilterUrl({ gender: "female" })}
									>
										Women
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3>Price</h3>
							<ul>
								{prices.map(p => (
									<li key={p.name}>
										<Link
											to={getFilterUrl({ min: p.min, max: p.max })}
											className={
												`${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
											}
										>
											{p.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h3>Avg. Customer Review</h3>
							<ul>
								{ratings.map(r => (
									<li key={r.name}>
										<Link
											to={getFilterUrl({ rating: r.rating })}
											className={`${r.rating}` === `${rating}` ? "active" : ""}
										>
											<Rating caption={" & up"} rating={r.rating}></Rating>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="col-3">
						{loading ? (
							<LoadingBox></LoadingBox>
						) : error ? (
							<MessageBox variant="danger">{error}</MessageBox>
						) : (
							<>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										paddingTop: "8rem",
									}}
								>
									<div
										style={{
											// float: "right",
											margin: "10px 30px 10px 10px",
											display: "flex",
											alignItems: "center",
											justifyContent: "flex-end",
										}}
									>
										<div className="dropdown">
											<small style={{ color: "#6c757d" }}>
												<b>SORT BY</b>{" "}
											</small>
											<Link to="#">
												<small
													style={{
														fontFamily: "inherit",
														fontWeight: "600",
													}}
												>
													{order === "newest"
														? "Newest Arrivals"
														: order === "lowest"
														? "Price: Low to High"
														: order === "highest"
														? "Price: High to Low"
														: "Popular"}{" "}
													<i className="fa fa-caret-down"></i>
												</small>
											</Link>
											<ul className="dropdown-content-sort">
												<li>
													<Link
														className={order === "newest" ? "active" : ""}
														to={getFilterUrl({ order: "newest" })}
													>
														Newest Arrivals
													</Link>
												</li>
												<li>
													<Link
														className={order === "lowest" ? "active" : ""}
														to={getFilterUrl({ order: "lowest" })}
													>
														Price: Low to High
													</Link>
												</li>
												<li>
													<Link
														className={order === "highest" ? "active" : ""}
														to={getFilterUrl({ order: "highest" })}
													>
														Price: High to Low
													</Link>
												</li>
												<li>
													<Link
														className={order === "toprated" ? "active" : ""}
														to={getFilterUrl({ order: "toprated" })}
													>
														Popular
													</Link>
												</li>
											</ul>
										</div>
										{/* SORT BY {order}
										<select
											value={order}
											onChange={e => {
												props.history.push(
													getFilterUrl({ order: e.target.value })
												);
											}}
										>
											<option value="newest">Newest Arrivals</option>
											<option value="lowest">Price: Low to High</option>
											<option value="highest">Price: High to Low</option>
											<option value="toprated">Avg. Customer Reviews</option>
										</select> */}
									</div>

									{products.length === 0 && (
										<MessageBox>No Product Found</MessageBox>
									)}
									<div className="row space-even">
										{products.map(product => (
											<Product key={product._id} product={product}></Product>
										))}
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchScreen;
