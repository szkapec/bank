import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISubAccount } from "./subAccountInterface";
import { getConnectAccount, newConnectAccount } from "./subAccountThunk";

const initialState: ISubAccount = {
  accounts: [],
  newAccount: {
    accountId: '',
    accountName: ''
  },
  message: '',
  loading: false,
  error: false,

};

export const subAccountSlice = createSlice({
  name: "SUB_ACCOUNT",
  initialState,
  reducers: {
    refreshAccount: (state) => {
      state.newAccount = {
        accountId: '',
        accountName: ''
      };
      state.message = '';
      state.error = false;
    },
  },
  extraReducers: {
    [newConnectAccount.pending.toString()]: (state) => {
      state.loading = true;
    },
    [newConnectAccount.fulfilled.toString()]: (state, { payload }: PayloadAction<any> ) => {
      if(payload.error){
        state.message = payload.message.message;
        state.error = payload?.error;
        state.loading = false;
      } else {
        state.accounts = [...state.accounts, payload.newAccount];
        state.newAccount = payload.newAccount
        state.loading = false;
        state.error = payload?.error;
      }
    },
    [newConnectAccount.rejected.toString()]: (state) => {
      state.loading = true;
    },
    [getConnectAccount.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getConnectAccount.fulfilled.toString()]: (state, { payload }: PayloadAction<any> ) => {
      state.accounts = payload.connectAccount || []
      state.loading = false;
    },
    [getConnectAccount.rejected.toString()]: (state) => {
      state.loading = true;
    },
  }
})


export const { refreshAccount } = subAccountSlice.actions;
export default subAccountSlice.reducer;
