import { createSelector } from "@reduxjs/toolkit";
import { IAdminRoot, IAdminUsersInitialState } from "./adminInterface";

const selectSelf = (admin: IAdminRoot) => admin;

export const selectorAdminUsers = createSelector(
  selectSelf,
  (state) => state.admin.users
);

export const selectorAdminUsersLoader = createSelector(
  selectSelf,
  (state) => state.admin.loadingUsers
);
