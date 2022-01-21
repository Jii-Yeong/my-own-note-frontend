import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import persistedReducer from "$src/stores/reducers";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();