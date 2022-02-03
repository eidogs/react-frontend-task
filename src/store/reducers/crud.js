import {
    FETCH_USERS_SUCCESS,
    ADD_USER_SUCCESS,
    EDIT_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    REQUEST_LOADING,
    REQUEST_FAILED,
    SORT_USERS_BY_NAME
} from "../actions/actionTypes";
import { editUserInArray, deleteUserInArray } from "../../helpers";

const INITIAL_STATE = {
    users: [],
    error: null,
    loading: false,
};

const crudReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_LOADING:
            return {
                ...state,
                loading: true,
            };
        case REQUEST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null,
            };
        case ADD_USER_SUCCESS:
            const newArr = [...state.users];
            newArr.push({
                ...action.payload,
                id: state.users.length + 1
            });
            return {
                ...state,
                users: newArr,
                loading: false,
                error: null
            };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                users: editUserInArray([...state.users], action.payload),
                loading: false,
                error: null,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                users: deleteUserInArray([...state.users], action.payload),
                loading: false,
                error: null,
            };
        case SORT_USERS_BY_NAME:
            const arrToSort = [...state.users];
            if (action.payload === "asc") {
                arrToSort.sort((user1, user2) => {
                    const username1 = user1.username.toUpperCase();
                    const username2 = user2.username.toUpperCase();
                    if (username1 < username2) {
                        return -1;
                    }
                    if (username1 > username2) {
                        return 1;
                    }
                    return 0;
                })
            } else if (action.payload === "desc") {
                arrToSort.sort((user1, user2) => {
                    const username1 = user1.username.toUpperCase();
                    const username2 = user2.username.toUpperCase();
                    if (username1 > username2) {
                        return -1;
                    }
                    if (username1 < username2) {
                        return 1;
                    }
                    return 0;
                })
            }
            return {
                ...state,
                users: arrToSort
            };
        default:
            return state;
    }
};

export default crudReducer;
