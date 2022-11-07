import { createSelector } from "@reduxjs/toolkit";
import { IGlobalRecipients } from "./recipientInterface";

const selectSelf = (state: IGlobalRecipients) => state;

export const selectorLoaderRecipient = createSelector(
  selectSelf,
  (state) => state.recipients.loading
);

export const selectorDataRecipient = createSelector(
  selectSelf,
  (state) => state.recipients.saved
);