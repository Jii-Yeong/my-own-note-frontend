import { combineReducers } from "@reduxjs/toolkit";
import textContentsReducer from "../modules/textContentSlice";

export default combineReducers({
  textContent: textContentsReducer,
})