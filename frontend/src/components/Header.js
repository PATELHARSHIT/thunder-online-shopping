import React, { useState, Component, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	badge: {
		top: "0rem",
		right: "-1rem",
		fontSize: "1.1rem",
		margin: "0 1rem",
		borderRadius: "50%",
		lineHeight: 1.7,
		background: "#fdd835",
		color: "#000",
		height: "18px",
		width: "18px",
		textAlign: "center",
		fontFamily: "'Montserrat', sans-serif",
	},
}));

function Header(props) {
	const classes = useStyles();
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;
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
							{/* <li> */}
							<Link to="/men">MEN</Link>
							{/* </li> */}
							{/* <li> */}
							<Link to="/women">WOMEN</Link>
							{/* </li> */}
						</div>
					</div>
					<div>
						<div className={isOpen ? "nav-links show-nav" : "nav-links"}>
							{/* <li> */}

							<Link to="/signin">LOGIN</Link>
							{/* </li> */}
							{/* <li> */}
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

							{/* <Link to="/cart">
								<Badge
									badgeContent={5}
									overlap="circle"
									classes={{ badge: classes.badge }}
								>
									<LocalMallOutlinedIcon fontSize="large" />
								</Badge>
							</Link> */}

							{/* </li> */}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { FaAlignRight } from "react-icons/fa";

// export default class Navbar extends Component {
// 	state = {
// 		isOpen: false,
// 	};
// 	handleToggle = () => {
// 		this.setState({ isOpen: !this.state.isOpen });
// 	};
// 	render() {
// 		return (
// 			<header className="navbar">
// 				<div className="nav-center">
// 					<div className="nav-header">
// 						<div className="brand-section">
// 							<Link className="brand" to="/">
// 								THUNDER
// 							</Link>
// 							<span className="slogan">SWEAT IN STYLE</span>
// 						</div>
// 						<button
// 							type="button"
// 							className="nav-btn"
// 							onClick={this.handleToggle}
// 						>
// 							<FaAlignRight className="nav-icon" />
// 						</button>
// 					</div>
// 					<div
// 						className={!this.state.isOpen ? "brand-section-links" : "show-nav "}
// 					>
// 						<div>
// 							<div
// 								className={
// 									this.state.isOpen ? "nav-links show-nav" : "nav-links"
// 								}
// 							>
// 								{/* <li> */}
// 								<Link to="/men">MEN</Link>
// 								{/* </li> */}
// 								{/* <li> */}
// 								<Link to="/women">WOMEN</Link>
// 								{/* </li> */}
// 							</div>
// 						</div>
// 						<div>
// 							<div
// 								className={
// 									this.state.isOpen ? "nav-links show-nav" : "nav-links"
// 								}
// 							>
// 								{/* <li> */}
// 								<Link to="/signin">LOGIN</Link>
// 								{/* </li> */}
// 								{/* <li> */}
// 								<Link to="/cart">
// 									<LocalMallOutlinedIcon fontSize="large" />
// 								</Link>
// 								{/* </li> */}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</header>
// 		);
// 	}
// }
