import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state

export const selectorLoginUser = createSelector(selectSelf, (state) => state.user)

export const selectorLoginUserError = createSelector(selectSelf, (state) => state.user.error)
