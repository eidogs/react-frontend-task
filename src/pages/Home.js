import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

import Loader from "../components/Loader/Loader";
import { JSON_PLACEHOLDER_URL } from "../config/constants";

import {
  deleteUserSuccess,
  requestFailed,
  sortUsers
} from "../store/actions/crud";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Home = () => {
  const users = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const [modalVisible, setModalVisible] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [sortType, setSortType] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = (userData) => {
    navigate("/edit", { state: userData });
  };

  const handleDeleteClick = (id) => {
    setItemToDeleteId(id);
    setModalVisible(true);
  };

  const deleteUser = () => {
    setDeleting(true);
    axios
      .delete(`${JSON_PLACEHOLDER_URL}${itemToDeleteId}`)
      .then(() => {
        dispatch(deleteUserSuccess(itemToDeleteId));
        setDeleting(false);
        setModalVisible(false);
      })
      .catch((error) => {
        dispatch(requestFailed(error));
        setDeleting(false);
      });
  };

  const sort = () => {
    dispatch(sortUsers(sortType));
    setSortType(!sortType ? "desc" : sortType === "asc" ? "desc" : "asc");
  }

  return (
    <div className="card mt-5 mb-5">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5>User list</h5>
        <button className="btn btn-secondary" onClick={sort}>
          Sort        
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/add")}>
          Add new
        </button>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error.message}</div>}
        {loading ? (
          <Loader />
        ) : (
          <table className="table">
            <thead className="thead-light">
              <tr className="text-center">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">City</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, username, email, address }) => (
                <tr key={id} className="text-center">
                  <th scope="row">{id}</th>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{address.city}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-block text-white"
                      onClick={() =>
                        handleEditClick({ id, name, username, email, address })
                      }
                    >
                      edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-block"
                      onClick={() => handleDeleteClick(id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={customStyles}
      >
        <div className="card">
          <div className="card-header">
            <h5>Delete</h5>
          </div>
          <div className="card-body">
            <p>Are you sure you want to delete this item ?</p>
            {error && <div className="alert alert-danger">{error.message}</div>}
          </div>
          <div className="card-footer">
            {deleting ? (
              <Loader />
            ) : (
              <div className="container-fluid d-flex justify-content-end">
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => setModalVisible(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={deleteUser}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
