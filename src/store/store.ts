import {
  CombinedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import loginSlice from "./Login/loginSlice";
import transferSlice from "./Transfer/transferSlice";
import searchSlice from "./Search/searchSlice";
import { Reducer } from "redux";

const appReducer = combineReducers({
  auth: loginSlice,
  transfers: transferSlice,
  search: searchSlice,
});

const rootReducer: Reducer<
  CombinedState<{
    auth: any;
    transfers: any;
    search: any;
  }>
> = (state, action) => {
  console.log(`action.type`, action.type)
  if (action.type === "logout") {
    state = undefined;
  }
  return appReducer(state, action)
};

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
