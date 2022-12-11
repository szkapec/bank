import { createSlice } from "@reduxjs/toolkit";
import { changePassword, login, register, remindCode, remindPassword } from "./loginThunk";

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
    subtractMoney: (state, { payload }) => {
      state.user.money = (Number(state.user.money) - Number(payload)).toString()
    }
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
    [remindPassword.pending.toString()]: (state) => {
      state.loading = true;
    },
    [remindPassword.fulfilled.toString()]: (state) => {
      state.loading = false;
    },
    [remindPassword.rejected.toString()]: (state) => {
      state.loading = false;
    },
    [remindCode.pending.toString()]: (state) => {
      state.loading = true;
    },
    [remindCode.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
    },
    [remindCode.rejected.toString()]: (state) => {
      state.loading = false;
    },
    [changePassword.pending.toString()]: (state) => {
      state.loading = true;
    },
    [changePassword.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
    },
    [changePassword.rejected.toString()]: (state) => {
      state.loading = false;
    },
  },
});

export const { clearAllUsers, logOut, subtractMoney } = loginSlice.actions;
export default loginSlice.reducer;
