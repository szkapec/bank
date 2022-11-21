import { createSlice } from "@reduxjs/toolkit";
import { GetUsersAdmin } from "./adminThunk";
import { IAdminUsersInitialState } from "./adminInterface";

const initialState: IAdminUsersInitialState = {
  users: [],
  loadingUsers: false,
};

export const adminSlice = createSlice({
  name: "LOGIN",
  initialState,
  reducers: {},
  extraReducers: {
    [GetUsersAdmin.pending.toString()]: (state) => {
      state.loadingUsers = true;
    },
    [GetUsersAdmin.fulfilled.toString()]: (state, { payload }) => {
      state.users = payload.users;
      state.loadingUsers = false;
    },
    [GetUsersAdmin.rejected.toString()]: (state) => {
      state.loadingUsers = false;
    },
  },
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;
