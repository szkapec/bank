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

export const selectorAuthLoginEmail = createSelector(
  selectSelf,
  (state) => state.auth?.user.email
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

export const selectorLanguage = createSelector(
  selectSelf,
  (state) => state.auth?.user.language
);

export const selectorLimit = createSelector(
  selectSelf,
  (state) => state.auth?.user.limit
);

export const selectorPermision = createSelector(
  selectSelf,
  (state) => state.auth?.user.permission
);

export const selectorColor = createSelector(
  selectSelf,
  (state) => state.auth?.user.color
);