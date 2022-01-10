import { configureStore } from "@reduxjs/toolkit";
import rootReducer from '$src/stores/reducers'

export const store = configureStore({
  reducer: rootReducer,
})