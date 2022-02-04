import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Loader from "../components/Loader/Loader";
import { addUserSuccess, requestFailed } from "../store/actions/crud";
import { JSON_PLACEHOLDER_URL } from "../config/constants";

const Add = () => {
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		username: "",
		city: "",
	});
	const [loading, setLoading] = useState(false);
	const [formFieldError, setFormFieldError] = useState("");
	const error = useSelector((state) => state.error);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (event, key) => {
		if (formFieldError) {
			setFormFieldError("");
		}
		const formData = { ...userData };
		formData[key] = event.target.value;
		setUserData(formData);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (userData.name === "" || userData.email === "") {
			if (userData.name === "") {
				return setFormFieldError("The name field is required");
			}
			return setFormFieldError("The email is required");
		}
		if (
			!userData.email.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			return setFormFieldError("The email format is incorrect");
		}
		setLoading(true);
		axios
			.post(JSON_PLACEHOLDER_URL)
			.then(() => {
				dispatch(
					addUserSuccess({
						...userData,
						address: { city: userData.city },
					})
				);
				setLoading(false);
				navigate(-1);
			})
			.catch((error) => {
				dispatch(requestFailed(error));
				setLoading(false);
			});
	};

	return (
		<div className="card mt-5">
			<div className="card-header">
				<h5>Add User</h5>
			</div>
			<div className="card-body">
				{error && (
					<div className="alert alert-danger">{error.message}</div>
				)}
				{formFieldError && (
					<div className="alert alert-danger">{formFieldError}</div>
				)}
				<div className="form-group row ml-5">
					<label
						htmlFor="name"
						className="col-sm-2 col-form-label text-bold"
					>
						Name
					</label>
					<div className="col-sm-8">
						<input
							type="text"
							className="form-control"
							id="name"
							placeholder="Name"
							onChange={(event) => handleChange(event, "name")}
						/>
					</div>
				</div>
				<div className="form-group row ml-5">
					<label
						htmlFor="email"
						className="col-sm-2 col-form-label text-bold"
					>
						Email
					</label>
					<div className="col-sm-8">
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="Email"
							onChange={(event) => handleChange(event, "email")}
						/>
					</div>
				</div>
				<div className="form-group row ml-5">
					<label
						htmlFor="username"
						className="col-sm-2 col-form-label text-bold"
					>
						Username
					</label>
					<div className="col-sm-8">
						<input
							type="text"
							className="form-control"
							id="username"
							placeholder="Username"
							onChange={(event) =>
								handleChange(event, "username")
							}
						/>
					</div>
				</div>
				<div className="form-group row ml-5">
					<label
						htmlFor="city"
						className="col-sm-2 col-form-label text-bold"
					>
						City
					</label>
					<div className="col-sm-8">
						<input
							type="text"
							className="form-control"
							id="city"
							placeholder="City"
							onChange={(event) => handleChange(event, "city")}
						/>
					</div>
				</div>
				{loading ? (
					<Loader />
				) : (
					<div className="form-group row">
						<div className="col-sm-10 d-flex justify-content-end">
							<button
								className="btn btn-outline-danger mr-2"
								onClick={() => navigate(-1)}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="btn btn-success"
								onClick={handleSubmit}
							>
								Submit
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Add;
