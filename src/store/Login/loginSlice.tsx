import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./loginThunk";

const initialState = {
  user: {},
  loading: false,
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    clearAllUsers: (state) => {
      state.user = [];
      state.loading = false;
    },
    logOut: (state) => {
      state.user = [];
      state.loading = false;
    },
  },
  // https://dev.to/chinwike/separating-logic-in-your-redux-toolkit-application-h7i
  extraReducers: {
    [login.pending.toString()]: (state) => {
      state.loading = true;
    },
    [login.fulfilled.toString()]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    },
    [login.rejected.toString()]: (state) => {
      state.loading = false;
    },
    [register.pending.toString()]: (state) => {
      state.loading = true;
    },
    [register.fulfilled.toString()]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    },
    [register.rejected.toString()]: (state) => {
      state.loading = false;
    },
  },
});

export const { clearAllUsers, logOut } = loginSlice.actions;
export default loginSlice.reducer;
