import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Login/loginSlice.tsx";

export default configureStore({
  reducer: {
    auth: loginSlice,
  },
});
