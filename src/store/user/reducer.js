import {createSlice} from '@reduxjs/toolkit';
import {appConfig} from '../../utils/constants';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    userProfile: '',
    token: '',
    isLoggedIn: false,
    initialized: true,
    contributorProfile: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      avatar: ''
    },
    organizationProfile: {
      uid: '',
      ngoId: '',
      regNo: '',
      email: '',
      name: '',
      state: '',
      city: '',
      address: '',
      avatar: ''
    }
  },
  reducers: {
    updateToken: (state,action) => {
      state.token = action.payload;
    },
    updateInitialized: (state,action) => {
      state.initialized = action.payload;
    },
    updateContributorProfile: (state,action) => {
      state.contributorProfile = action.payload;
      state.userProfile = appConfig.profile.contributor;
      state.isLoggedIn = true;
    },
    updateOrganizationProfile: (state,action) => {
      state.organizationProfile = action.payload;
      state.userProfile = appConfig.profile.organizer;
      state.isLoggedIn = true;
    },
    updateLoggedIn: (state,action) => {
      state.isLoggedIn = action.payload;
    },
    clearUserData: (state) => {
      state.isLoggedIn = false;
      state.token = '';
      state.userProfile = '';
    }
  },
});

export const {updateContributorProfile,updateOrganizationProfile,updateToken,updateLoggedIn,updateInitialized,clearUserData} = userSlice.actions;

export default userSlice.reducer;