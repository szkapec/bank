import { createSelector } from "@reduxjs/toolkit";
import { ISearch } from "./searchInterface";


const selectSelf = (state: ISearch) => state;

export const selectorSearch = createSelector(
  selectSelf,
  (state) => state.search
);

export const selectorSearchName = createSelector(
  selectSelf,
  (state) => state.search.searchName
);

export const selectorSearchRecExp = createSelector(
  selectSelf,
  (state) => state.search.recExp
);

export const selectorSearchAbove = createSelector(
  selectSelf,
  (state) => state.search.above
);

export const selectorSearchUpTo = createSelector(
  selectSelf,
  (state) => state.search.upTo
);
