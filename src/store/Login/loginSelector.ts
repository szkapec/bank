import { createSelector } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  token: string;
  refreshToken: string;
  email: string;
  error: boolean;
  bankAccountNumber: string;
  savedRecipients: any;
  transfers: any;
  premium: boolean;
  message: string;
  money: number
}
export interface IAuth {
  auth: {
    user: IUser;
    error: boolean;
    loading: boolean;
  };
}

const selectSelf = (state: IAuth) => state;

export const selectorLoginUser = createSelector(
  selectSelf,
  (state) => state.auth
);

export const selectorAuthLoginUser = createSelector(
  selectSelf,
  (state) => state.auth?.user
);

export const selectorLoginUserError = createSelector(
  selectSelf,
  (state) => state.auth?.user?.error
);
