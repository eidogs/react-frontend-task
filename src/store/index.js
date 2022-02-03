import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import crudReducer from './reducers/crud';

export const store = createStore(crudReducer, applyMiddleware(thunk));
