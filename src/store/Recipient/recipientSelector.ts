import { createSelector } from "@reduxjs/toolkit";
import { IRecipients } from "./recipientInterface";
import { IInitialState } from "./recipientSlice";

const selectSelf = (state: IRecipients) => state;

export const selectorLoaderRecipient = createSelector(
  selectSelf,
  (state) => state.recipients.loading
);

export const selectorDataRecipient = createSelector(
  selectSelf,
  (state) => state.recipients.saved
);