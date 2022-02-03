import {
    FETCH_USERS_SUCCESS,
    ADD_USER_SUCCESS,
    EDIT_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    REQUEST_LOADING,
    REQUEST_FAILED,
    SORT_USERS_BY_NAME
} from "./actionTypes";
import axios from "axios";

import { USERS_URL } from '../../config/constants';

export const usersFetchSuccess = (data) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: data,
    };
};

export const addUserSuccess = (user) => {
    return {
        type: ADD_USER_SUCCESS,
        payload: user
    };
};

export const editUserSuccess = (user) => {
    return {
        type: EDIT_USER_SUCCESS,
        payload: user,
    };
};

export const deleteUserSuccess = (id) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: id,
    };
};

export const requestFailed = (error) => {
    return {
        type: REQUEST_FAILED,
        payload: error,
    };
};

export const loadRequest = () => {
    return {
        type: REQUEST_LOADING,
    };
};

export const sortUsers = (order = "asc") => {
    return {
        type: SORT_USERS_BY_NAME,
        payload: order
    }
};

export const fetchUsers = () => (dispatch) => {
    dispatch(loadRequest());
    axios
        .get(USERS_URL)
        .then(({ data }) => {
            dispatch(usersFetchSuccess(data));
        })
        .catch((error) => {
            dispatch(requestFailed(error));
        });
};
