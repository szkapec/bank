import { createSlice, PayloadAction, nanoid  } from "@reduxjs/toolkit";
import { addUserRecipients, deleteUserRecipients, editUserRecipients, userRecipients } from "./recipientThunk";
import { IAddRecipient, IRecipients } from './recipientInterface'
import { loginSwitchAccount } from "store/Login/loginThunk";


const initialState: IRecipients = {
    saved: [],
    loading: false,
};

export const recipientSlice = createSlice({
  name: "LOGIN",
  initialState,
  reducers: {
    getRecipientTest: (state, { payload }: PayloadAction<IAddRecipient[]>) => {
      // console.log('payload :>> ', payload);
      // state.saved = payload;
    },
  },
  extraReducers: {
    [userRecipients.pending.toString()]: (state) => {
      state.loading = true;
      // state.saved = [];
    },
    [userRecipients.fulfilled.toString()]: (state, { payload }: PayloadAction<IAddRecipient[]>) => {
      state.saved = payload;
      state.loading = false;
    },
    [userRecipients.rejected.toString()]: (state) => {
      state.loading = false;
    },
    [loginSwitchAccount.fulfilled.toString()]: (state) => {
      state.saved = []
    },
    [addUserRecipients.fulfilled.toString()]: (state, { payload }: PayloadAction<any>) => {
      state.saved = payload
    },
    [editUserRecipients.fulfilled.toString()]: (state, { payload }: PayloadAction<any>) => {
      state.saved = payload
    },
    [deleteUserRecipients.fulfilled.toString()]: (state, { payload }: PayloadAction<any>) => {
      state.saved = payload
    }
  },
});

export const { getRecipientTest } = recipientSlice.actions;
export default recipientSlice.reducer;
