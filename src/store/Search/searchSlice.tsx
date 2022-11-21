import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchName: "",
  recExp: "all",
  above: "0",
  upTo: "0",
};

export const searchSlice = createSlice({
  name: "SEARCH",
  initialState,
  reducers: {
    filterTransferHistory: (state, action) => {
      state.searchName = action.payload.searchName;
    },
    filterRecExp: (state, action) => {
      state.recExp = action.payload;
    },
    filterSumAbove: (state, action) => {
      state.above = action.payload;
    },
    filterSumUpTo: (state, action) => {
      state.upTo = action.payload;
    },
  },
});

export const {
  filterTransferHistory,
  filterRecExp,
  filterSumAbove,
  filterSumUpTo,
} = searchSlice.actions;
export default searchSlice.reducer;
