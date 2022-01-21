/// <reference types="redux-persist" />

import { combineReducers } from "@reduxjs/toolkit";
import textContentsReducer from "../modules/textContentSlice";
import pageSliceReducer from "../modules/pageSlice";
import userSliceReducer from '../modules/userSlice';
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["userInfo"]
};

const rootReducer = combineReducers({
  textContent: textContentsReducer,
  page: pageSliceReducer,
  userInfo: userSliceReducer,
})

export default persistReducer(persistConfig, rootReducer);