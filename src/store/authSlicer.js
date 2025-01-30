import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, // or true if a user is logged in
  userData: null, // optional user data
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      console.log("This is state " + state);
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlicer.actions;
export default authSlicer.reducer;
