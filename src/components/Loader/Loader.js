import React from "react";
import "./Loader.css";

const Loader = () => {
	return (
		<div className="container-fluid d-flex justify-content-center align-items-center">
			<div className="lds-dual-ring"></div>
		</div>
	);
};

export default Loader;
