import React from "react";
import { Link } from "react-router-dom";

function Edition() {
	return (
		<div className="row center">
			<div className="edition">
				<Link to="search/edition/Unstoppable">
					<img
						className="image-edition"
						src="./images/unstoppable.jpg"
						alt=""
					/>
					<h1 className="edition-title">UNSTOPPALBE</h1>
				</Link>
			</div>
			<div className="edition">
				<Link to="search/edition/Rise">
					<img className="image-edition" src="./images/rise.jpg" alt="" />
					<h1 className="edition-title">RISE</h1>
				</Link>
			</div>
			<div className="edition">
				<Link to="search/edition/Thunder">
					<img className="image-edition" src="./images/thunder.jpg" alt="" />
					<h1 className="edition-title">THUNDER</h1>
				</Link>
			</div>
		</div>
	);
}

export default Edition;
