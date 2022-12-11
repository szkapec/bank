import { createSelector } from "@reduxjs/toolkit";
import { IAuth } from './loginInterface';

const selectSelf = (state: IAuth) => state;

export const selectorLoginUser = createSelector(
  selectSelf,
  (state) => state.auth
);

export const selectorAuthLoginUser = createSelector(
  selectSelf,
  (state) => state.auth?.user
);

export const selectorAuthLoginUserNumberAccount = createSelector(
  selectSelf,
  (state) => state.auth?.user?.bankAccountNumber
);

export const selectorLoginUserError = createSelector(
  selectSelf,
  (state) => state.auth?.user?.error
);

export const selectorAuthLoginId = createSelector(
  selectSelf,
  (state) => state.auth?.user?.id
);

export const selectorAuthLoading = createSelector(
  selectSelf,
  (state) => state.auth?.loading
);