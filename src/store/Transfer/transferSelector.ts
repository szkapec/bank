import { createSelector } from "@reduxjs/toolkit";
import { ITransfer } from './transferInterface';

const selectSelf = (state: ITransfer) => state;

export const selectorLoginUser = createSelector(
  selectSelf,
  (state) => state.transfers
);

export const selectorTransferError = createSelector(
  selectSelf,
  (state) => state.transfers.transfer.error
);

export const selectorTransferMessage = createSelector(
  selectSelf,
  (state) => state.transfers.transfer.message
);

export const selectorTransfers = createSelector(
  selectSelf,
  (state) => state.transfers.data
);

export const selectorLoaderTransfer = createSelector(
  selectSelf,
  (state) => state.transfers.loading
);