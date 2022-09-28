import { createSlice } from '@reduxjs/toolkit';
import { reducer } from './user.reducer';


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: 'usersxd'
  },
  reducers: {
    next: (state) => {
      console.log(`state`, state.payload)
      state.username = state;
    },
    newRedcer: (state) => { return reducer}
  }
})

export const { next, newRedcer } = userSlice.actions;



export default userSlice.reducer;