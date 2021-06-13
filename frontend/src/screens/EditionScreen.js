import React from "react";
import { useParams } from "react-router";
import SearchScreen from "./SearchScreen";

function EditionScreen(props) {
	var { edition } = useParams();
	return (
		<div style={{ marginTop: 20 }}>
			<div style={{ display: "flex" }}>
				<img
					src={`/images/${edition.toLowerCase()}.jpg`}
					style={{ width: "30%", objectFit: "cover" }}
					alt="thunder"
				/>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flex: 1,
						flexDirection: "column",
					}}
				>
					<b style={{ paddingLeft: "20px", fontSize: "100px" }}>{edition}</b>
					<div style={{ border: "4px solid #f95b5b", width: "40%" }}></div>
				</div>
			</div>
			<SearchScreen />
		</div>
	);
}

export default EditionScreen;
