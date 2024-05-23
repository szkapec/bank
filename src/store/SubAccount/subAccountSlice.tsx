import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISubAccount, PayloadAccount } from "./subAccountInterface";
import { getConnectAccount, newConnectAccount, separateAccount } from "./subAccountThunk";


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
    logOutSubAccount: (state) => {
      state.accounts = initialState.accounts;
      state.newAccount = {
        accountId: '',
        accountName: ''
      };
      state.message = initialState.message;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
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
        state.accounts = payload.newAccount.connectAccount
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
    [getConnectAccount.fulfilled.toString()]: (state, { payload }: PayloadAction<PayloadAccount> ) => {
      state.accounts = payload?.connectAccount || []
      state.loading = false;
    },
    [getConnectAccount.rejected.toString()]: (state) => {
      state.loading = true;
    },
    [separateAccount.pending.toString()]: (state) => {
      state.loading = true;
    },
    [separateAccount.fulfilled.toString()]: (state, { payload }: PayloadAction<PayloadAccount> ) => {
      state.accounts = payload?.connectAccount || []
      state.loading = false;
    },
    [separateAccount.rejected.toString()]: (state) => {
      state.loading = true;
    },
  }
})

export const { refreshAccount, logOutSubAccount } = subAccountSlice.actions;
export default subAccountSlice.reducer;
