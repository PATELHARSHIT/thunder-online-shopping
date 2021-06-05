import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { useEffect } from "react";
import {
	listProductCategories,
	listProductEditions,
} from "../actions/productActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

function Header(props) {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;
	const userSignIn = useSelector(state => state.userSignIn);
	const { userInfo } = userSignIn;

	const signOutHandler = () => {
		dispatch(signout());
	};

	const productCategoryList = useSelector(state => state.productCategoryList);
	const {
		loading: loadingCategories,
		error: errorCategories,
		categories,
	} = productCategoryList;
	useEffect(() => {
		dispatch(listProductCategories());
		dispatch(listProductEditions());
	}, [dispatch]);

	return (
		<header className="navbar">
			<div className="nav-center">
				<div className="nav-header">
					<Link className="brand" to="/">
						<div className="brand-section">
							THUNDER
							<span className="slogan">SWEAT IN STYLE</span>
						</div>
					</Link>
					<button type="button" className="nav-btn" onClick={handleToggle}>
						<FaAlignRight className="nav-icon" />
					</button>
				</div>
				<div className={!isOpen ? "brand-section-links" : "show-nav"}>
					<div>
						<div className={isOpen ? "nav-links show-nav" : "nav-links"}>
							<Link to="/search/gender/male">MEN</Link>

							<Link to="/search/gender/female">WOMEN</Link>

							<div className="dropdown">
								<Link to="#categories">CATEGORIES</Link>
								<ul className="dropdown-content">
									{loadingCategories ? (
										<LoadingBox />
									) : errorCategories ? (
										<MessageBox>{errorCategories}</MessageBox>
									) : (
										categories.map(c => (
											<li key={c}>
												<Link to={`/search/category/${c}`}>{c}</Link>
											</li>
										))
									)}
								</ul>
							</div>
						</div>
					</div>
					<div>
						<Route
							render={({ history }) => (
								<SearchBox history={history}></SearchBox>
							)}
						></Route>
					</div>
					<div>
						<div className={isOpen ? "nav-links show-nav" : "nav-links"}>
							{userInfo && userInfo.isAdmin && (
								<div className="dropdown">
									<Link to="#admin">
										Admin <i className="fa fa-caret-down"></i>
									</Link>
									<ul className="dropdown-content">
										<li>
											<Link to="/dashboard">Dashboard</Link>
										</li>
										<li>
											<Link to="/productlist">Products</Link>
										</li>
										<li>
											<Link to="/orderlist">Orders</Link>
										</li>
										<li>
											<Link to="/userlist">Users</Link>
										</li>
									</ul>
								</div>
							)}
							{userInfo ? (
								<div className="dropdown cart-container">
									<Link to="#">
										{/* <i class="far fa-user"></i> */}
										<PersonOutlineIcon fontSize="large" />
									</Link>
									<ul className="dropdown-content">
										<li>
											<span className="disabled" href="#">
												Hi, {userInfo.name}
											</span>
										</li>
										<hr />
										<li>
											<Link to="/profile">User Profile</Link>
										</li>
										<li>
											<Link to="/orderhistory">Order History</Link>
										</li>
										<li>
											<Link to="#signout" onClick={signOutHandler}>
												Sign Out
											</Link>
										</li>
									</ul>
								</div>
							) : (
								<Link to="/signin">LOGIN</Link>
							)}

							<div className="cart-container">
								<Link to="/wishlist">
									<FavoriteBorderIcon fontSize="large" />
								</Link>
							</div>
							<div className="cart-container">
								<Link to="/cart">
									<LocalMallOutlinedIcon fontSize="large" />
									{cartItems.length > 0 && (
										<span
											className={isOpen ? "cart-count-small" : "cart-count"}
										>
											{cartItems.length}
										</span>
									)}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
