import {
  CombinedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import loginSlice from "./Login/loginSlice";
import transferSlice from "./Transfer/transferSlice";
import searchSlice from "./Search/searchSlice";
import { Reducer } from "redux";
import recipientSlice from "./Recipient/recipientSlice";
import adminSlice from "./Admin/adminSlice";
import subAccountSlice from "./SubAccount/subAccountSlice";

const appReducer = combineReducers({
  auth: loginSlice,
  transfers: transferSlice,
  search: searchSlice,
  recipients: recipientSlice,
  subAccounts: subAccountSlice,
  admin: adminSlice,
});

const rootReducer: Reducer<
  CombinedState<{
    auth: any;
    transfers: any;
    search: any;
    recipients: any;
    subAccounts: any;
    admin: any;
  }>
> = (state, action) => {
  if (action.type === "LOGIN/logOut") {
    state = undefined;
  }
  return appReducer(state, action)
};

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
