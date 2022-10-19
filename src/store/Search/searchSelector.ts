import { createSelector } from "@reduxjs/toolkit";

export enum RecExp {
  All, 
  Receipts,
  Expenses,
}

export interface IUser {
  search: {
    firstname: string;
    lastname: string;
    searchName: string;
    recExp: string;
    above: string;
    upTo: string;
  };
}

const selectSelf = (state: IUser) => state;

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
