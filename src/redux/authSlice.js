import { createSlice } from "@reduxjs/toolkit";
// export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// import { toast } from "react-toastify";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  status: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCrediantials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.userInfo = null;
      state.status = "";
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCrediantials, logoutUser } = authSlice.actions;

export default authSlice.reducer;
