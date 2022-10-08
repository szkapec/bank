import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state) => state;

export const selectorLoginUser = createSelector(
  selectSelf,
  (state) => state.auth
);

export const selectorLoginTransferUser = createSelector(
  selectSelf,
  (state) => state.auth.user
);

export const selectorLoginUserError = createSelector(
  selectSelf,
  (state) => state.auth.error
);
