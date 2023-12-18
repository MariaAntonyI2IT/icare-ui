import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false
  },
  reducers: {
    enableLoginLoader: (state) => {
      state.loading = true;
    },
    disableLoginLoader: (state) => {
      state.loading = false;
    }
  },
});

export const {enableLoginLoader,disableLoginLoader} = loginSlice.actions;

export default loginSlice.reducer;