import { createSlice } from "@reduxjs/toolkit";
import { sendTransfer } from "./transferThunk";

const initialState = {
  transfer: {
    message: '',
    error: false
  },
  loading: false,
};

export const transferSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('jwtToken');
    },
    messageClear: (state) => {
      state.transfer.message = ''
    }
  },
  // https://dev.to/chinwike/separating-logic-in-your-redux-toolkit-application-h7i
  extraReducers: {
    [sendTransfer.pending.toString()]: (state) => {
      state.loading = true;
    },
    [sendTransfer.fulfilled.toString()]: (state, { payload }) => {
      state.transfer = payload;
      state.loading = false;
    },
    [sendTransfer.rejected.toString()]: (state) => {
      state.loading = false;
    },
  }
})

export const { logOut, messageClear } = transferSlice.actions;
export default transferSlice.reducer;
