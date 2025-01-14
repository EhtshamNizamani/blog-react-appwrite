import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlicer";
const store = configureStore({
  reducer: authReducer,
});

export default store;
