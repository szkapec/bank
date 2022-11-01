import { createSlice, PayloadAction, nanoid  } from "@reduxjs/toolkit";
import { userRecipients } from "./recipientThunk";
import { logOutTransfer } from '../Transfer/transferSlice'
import { createNotification } from "../../util/notification";
import { toast } from "react-toastify";

export interface IInitialState {
  saved: {
    id: string,
    recipientsAccount: string,
    recipientsAdress: string,
    recipientsName: string,
    sum: string,
    title: string,
    toRecipient: string,
    loading: boolean,
  }[],
  loading: boolean;
}

const initialState: IInitialState = {
    saved: [],
    loading: false,
};

export const recipientSlice = createSlice({
  name: "LOGIN",
  initialState,
  reducers: {
    getRecipientTest: (state, { payload }) => {
      state.saved = payload;
    },
  },
  extraReducers: {
    [userRecipients.pending.toString()]: (state) => {
      state.loading = true;
      // state.saved = [];
    },
    [userRecipients.fulfilled.toString()]: (state, { payload }) => {
      state.saved = payload;
      state.loading = false;
    },
    [userRecipients.rejected.toString()]: (state) => {
      state.loading = false;
    },
  },
});

export const { getRecipientTest } = recipientSlice.actions;
export default recipientSlice.reducer;
