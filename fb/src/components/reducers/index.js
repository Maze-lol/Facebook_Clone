import { combineReducers } from "redux";
import post from "./post";
import auth from "./auth";
export const reducers = combineReducers({ auth, post });
