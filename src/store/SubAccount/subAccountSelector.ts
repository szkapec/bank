import { createSelector } from "@reduxjs/toolkit";
import { IGlobalSubAccount } from "./subAccountInterface";


const selectSelf = (state: IGlobalSubAccount) => state;

export const selectorSubAccounts = createSelector(
  selectSelf,
  (state) => state.subAccounts.accounts
);

export const selectorNewSubAccounts = createSelector(
  selectSelf,
  (state) => state.subAccounts.newAccount
);

export const selectorNewSubAccountsMessage = createSelector(
  selectSelf,
  (state) => state.subAccounts.message
);

export const selectorSubAccountsLoading = createSelector(
  selectSelf,
  (state) => state.subAccounts.loading
);

export const selectorSubError = createSelector(
  selectSelf,
  (state) => state.subAccounts.error
);
