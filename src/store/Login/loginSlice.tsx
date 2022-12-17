import { createSlice } from "@reduxjs/toolkit";
import { loginChangePassword, login, register, loginRemindCode, loginRemindPassword, loginChangeUserLanguage, loginChangeLanguage } from "./loginThunk";

interface IInitialState {
  user: {
    id?: string,
    email?: string,
    error?: boolean,
    bankAccountNumber?: string,
    premium?: boolean,
    money?: string,
    message?: string,
    language?: string,
    permission?: [string]
    limit: undefined
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
    language: undefined,
    permission: undefined,
    limit: undefined,
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
    [loginRemindPassword.pending.toString()]: (state) => {
      state.loading = true;
    },
    [loginRemindPassword.fulfilled.toString()]: (state) => {
      state.loading = false;
    },
    [loginRemindPassword.rejected.toString()]: (state) => {
      state.loading = false;
    },
    [loginRemindCode.pending.toString()]: (state) => {
      state.loading = true;
    },
    [loginRemindCode.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
    },
    [loginRemindCode.rejected.toString()]: (state) => {
      state.loading = false;
    },
    [loginChangePassword.pending.toString()]: (state) => {
      state.loading = true;
    },
    [loginChangePassword.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
    },
    [loginChangePassword.rejected.toString()]: (state) => {
      state.loading = false;
    },
    [loginChangeUserLanguage.fulfilled.toString()]: (state, { payload }) => {
      state.user.language = payload.language;
    },
    [loginChangeLanguage.fulfilled.toString()]: (state, { payload }) => {
      state.user.limit = payload.limit;
    },
  },
});

export const { clearAllUsers, logOut, subtractMoney } = loginSlice.actions;
export default loginSlice.reducer;
