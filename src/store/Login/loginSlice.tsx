import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./loginThunk.tsx";

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
    [login.pending]: (state) => {
      console.log(`state1`, state);
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      console.log(`payload`, payload);
      console.log(`state2`, state);
      state.user = payload;
      state.loading = false;
    },
    [login.rejected]: (state) => {
      console.log(`state3`, state);
      state.loading = false;
    },
    [register.pending]: (state) => {
      console.log(`state1`, state);
      state.loading = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      console.log(`state2`, state);
      console.log("payload :>> ", payload);
      state.user = payload;
      state.loading = false;
    },
    [register.rejected]: (state) => {
      console.log(`state3`, state);
      state.loading = false;
    },
  },
});

export const { clearAllUsers, logOut } = loginSlice.actions;
export default loginSlice.reducer;
