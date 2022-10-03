import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './Login/loginSlice.tsx'
import userSlice from './User/user.slice'

export default configureStore({
  reducer: {
    user: loginSlice,
    // user: userSlice,
  }
})