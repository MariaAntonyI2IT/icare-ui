import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    userRole: '',
    contributorProfile: {
      email: '',
      firstName: '',
      lastName: ''
    },
    organizationProfile: {
      uid: '',
      ngoId: '',
      regId: '',
      email: '',
      name: '',
      state: '',
      city: '',
      address: ''
    }
  },
  reducers: {
    updateContributorProfile: (state,action) => {
      state.contributorProfile = action.payload;
      state.userRole = 'CONTRIBUTOR'
    },
    updateOrganizationProfile: (state,action) => {
      state.organizationProfile = action.payload;
      state.userRole = 'ORGANIZER'
    }
  },
});

export const {updateContributorProfile, updateOrganizationProfile} = userSlice.actions;

export default userSlice.reducer;