
import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
  name: 'users',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state, action) => {
      state.value += 1
    }
  },
});

export const { increment } = userSlice.actions;

export default userSlice.reducer;