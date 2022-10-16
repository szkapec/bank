import { createSelector } from "@reduxjs/toolkit";

export interface IUser {
  transfers: {
    transfer: {
      error: boolean,
      message: string,
    }
    data: [
      {
        _id: string,
        body: string,
        fromNumber: string,
        toNumber: string,
        error: boolean,
        message: string,
        createdAt: string
        toUser: {
          bankAccountNumber: String,
          email: string,
          id: string
        },
        fromUser: {
          bankAccountNumber: String,
          email: string,
          id: string
        }
      }
    ]
  }
  loading: boolean
}


const selectSelf = (state: IUser) => state;

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