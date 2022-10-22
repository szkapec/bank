import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./loginThunk";
import { logOutTransfer } from '../Transfer/transferSlice'

interface IInitialState {
  user: {
    id?: string,
    email?: string,
    error?: boolean,
    bankAccountNumber?: string,
    premium?: boolean,
    money?: string,
    message?: string,
  },
  loading: boolean
}

const initialState: IInitialState = {
  user: {
    id: undefined,
    email: undefined,
    error: false,
    bankAccountNumber: undefined,
    premium: false,
    money: undefined,
    message: undefined,
  },
  loading: false,
};

export const loginSlice = createSlice({
  name: "LOGIN",
  initialState,
  reducers: {
    clearAllUsers: (state) => {
      state.user = initialState.user;
      state.loading = false;
    },
    logOut: (state) => {
      localStorage.removeItem('jwtToken');
      state.user = initialState.user;
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
