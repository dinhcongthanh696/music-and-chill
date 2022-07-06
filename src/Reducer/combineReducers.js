import userReducer from "./userReducer";
import { combineReducers } from "@reduxjs/toolkit";
import featureReducer from "./featureReducer";
import fileReducer from "./fileReducer";
export default combineReducers({
    userReducer , 
    feature : featureReducer ,
    files : fileReducer
})