import { createSlice } from "@reduxjs/toolkit";
import { homeHighChartsThunk } from "./homeThunk";

const initialState = {
  highCharts: {
    fromClient: [],
    toClient: [],
  },
  loading: false,
};

export const homeSlice = createSlice({
  name: "HOME",
  initialState,
  reducers: {
    logOutHome: (state) => {
      state.highCharts = initialState.highCharts;
      state.loading = false;
    },
    filterTransferHistory2: (state, action) => {
      // state.homeName = action.payload.searchName;
    },
  },
  extraReducers: {
    [homeHighChartsThunk.pending.toString()]: (state) => {
      state.loading = true;
    },
    [homeHighChartsThunk.fulfilled.toString()]: (state, { payload }) => {
      state.highCharts = payload;
      state.loading = false;
    },
    [homeHighChartsThunk.rejected.toString()]: (state) => {
      state.loading = false;
    },
  },
});

export const { filterTransferHistory2, logOutHome } = homeSlice.actions;
export default homeSlice.reducer;
