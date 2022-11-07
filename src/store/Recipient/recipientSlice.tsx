import { createSlice, PayloadAction, nanoid  } from "@reduxjs/toolkit";
import { userRecipients } from "./recipientThunk";
import { IAddRecipient, IRecipients } from './recipientInterface'


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
  },
});

export const { getRecipientTest } = recipientSlice.actions;
export default recipientSlice.reducer;
