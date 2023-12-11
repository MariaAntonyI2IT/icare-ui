import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false
  },
  reducers: {
    enableLoader: (state) => {
      state.loading = true;
    },
    disableLoader: (state) => {
      state.loading = false;
    }
  },
});

export const {enableLoader,disableLoader} = appSlice.actions;

export default appSlice.reducer;