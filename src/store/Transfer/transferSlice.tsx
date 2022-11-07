import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IColumn, ITransfer } from "./transferInterface";
import { sendTransfer, getTransfers } from "./transferThunk";

const initialState: ITransfer = {
  transfer: {
    error: false,
    message: '',
  },
  data: [
    {
      toUser: {
        bankAccountNumber: '',
        email: '',
        id: '',
        firstName: '',
        lastName: '',
      },
      fromUser: {
        bankAccountNumber: '',
        email: '',
        id: '',
        firstName: '',
        lastName: '',
      },
      _id: '',
      id: '',
      body: '',
      createdAt: '',
      howMuchMoney: '',
      fromNumber: '',
      error: false,
      toNumber: '',
    }
  ],
  loading: false,
};


export const transferSlice = createSlice({
  name: "TRANSFER",
  initialState,
  reducers: {

    logOutTransfer: (state) => {
      state.transfer = initialState.transfer;
      state.data = [];
    },
    messageClear: (state) => {
      state.transfer.message = ''
    },
    saveTransfer: (state, { payload }: PayloadAction<IColumn[]> ) => {
      state.data = payload
    }
  },
  extraReducers: {
    [sendTransfer.pending.toString()]: (state) => {
      state.loading = true;
    },
    [sendTransfer.fulfilled.toString()]: (state, { payload }: PayloadAction<IColumn> ) => {
      state.data = [...state.data, payload];
      state.loading = false;
    },
    [sendTransfer.rejected.toString()]: (state) => {
      state.loading = false;
    },
    [getTransfers.fulfilled.toString()]: (state, { payload }: PayloadAction<IColumn[]> ) => {
      state.data = [...state.data, ...payload];
    }
  }
})

export const { logOutTransfer, messageClear, saveTransfer } = transferSlice.actions;
export default transferSlice.reducer;
