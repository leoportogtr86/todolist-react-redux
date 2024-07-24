import {combineReducers} from "redux";
import todoReducer from "./todoReducer.js";

const rootReducer = combineReducers({
    todos: todoReducer
});

export default rootReducer;