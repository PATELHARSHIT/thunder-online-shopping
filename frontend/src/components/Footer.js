import React from "react";

function Footer() {
	return (
		<footer className="row center">
			<div className="footer">
				{/* <div className="footer-links">
							<a href="/">Home</a>
							<a href="#">Products</a>
						</div> */}
				<p className="copyright">THUNDER © {new Date().getFullYear()}</p>
			</div>
		</footer>
	);
}

export default Footer;
