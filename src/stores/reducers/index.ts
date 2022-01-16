import { combineReducers } from "@reduxjs/toolkit";
import textContentsReducer from "../modules/textContentSlice";
import pageSliceReducer from "../modules/pageSlice";

const rootReducer = combineReducers({
  textContent: textContentsReducer,
  page: pageSliceReducer,
})

export default rootReducer;