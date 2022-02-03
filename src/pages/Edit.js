import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Loader from "../components/Loader/Loader";
import { editUserSuccess, requestFailed } from "../store/actions/crud";
import { JSON_PLACEHOLDER_URL } from "../config/constants";

const Edit = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({
    id: location.state.id,
    name: location.state.name,
    email: location.state.email,
    username: location.state.username,
  });
  const [address, setAddress] = useState(location.state.address);

  const [loading, setLoading] = useState(false);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event, key) => {
    const formData = { ...userData };
    formData[key] = event.target.value;
    setUserData(formData );
  };

  const handleCityChange = (event) => {
    setAddress({
      ...address,
      city: event.target.value
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .put(`${JSON_PLACEHOLDER_URL}${userData.id}`)
      .then(() => {
        dispatch(editUserSuccess({ ...userData, address: address }));
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
        <h5>Edit User</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error.message}</div>}
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
              value={userData.name}
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
              value={userData.email}
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
              value={userData.username}
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
              value={address.city}
              onChange={handleCityChange}
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

export default Edit;
