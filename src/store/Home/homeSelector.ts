import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state: any) => state;

export const selectorSearch2 = createSelector(
  selectSelf,
  (state) => state.search
);

