import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state
export const userSelector = createSelector(selectSelf, (state) => state.user)
