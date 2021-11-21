import {combineReducers} from "redux";
import UserReducer from "./UserReducer";
import GameReducer from "./GameReducer";

export default combineReducers({
    UserReducer,
    GameReducer,
})