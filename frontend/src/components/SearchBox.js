import React, { useState } from "react";

function SearchBox(props) {
	const [name, setName] = useState("");
	const submitHandler = e => {
		e.preventDefault();
		props.history.push(`/search/name/${name}`);
	};
	return (
		<div>
			<form onSubmit={submitHandler}>
				<div className="wrapper">
					<div className="search">
						<input
							type="text"
							name="q"
							id="q"
							placeholder="Search"
							onChange={e => setName(e.target.value)}
						></input>
						<button type="submit">
							<i className="fa fa-search"></i>
						</button>
					</div>
				</div>
			</form>
			<div></div>
		</div>
	);
}

export default SearchBox;
