import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Login/loginSlice";
import transferSlice from "./Transfer/transferSlice";

export const store = configureStore({
  reducer: {
    auth: loginSlice,
    transfers: transferSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
