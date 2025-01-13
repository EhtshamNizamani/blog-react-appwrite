import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlicer";
export const store = configureStore({
  reducer: authReducer,
});
