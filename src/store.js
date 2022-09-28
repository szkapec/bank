import { configureStore } from '@reduxjs/toolkit'
import userSlice from './store/User/user.slice'

export default configureStore({
  reducer: {
    user: userSlice,
  }
})

// export default store;