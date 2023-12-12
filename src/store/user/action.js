import {
  GOOGLE_LOGIN_USER_REQUESTED,LOGIN_USER_REQUESTED,REGISTER_CONTRIBUTOR_REQUESTED,
  REGISTER_ORGANIZATION_REQUESTED,VERIFY_ORGANIZATION_REQUESTED,FORGOT_PASSWORD_REQUESTED,VERIFY_OTP_REQUESTED,SEND_OTP_REQUESTED,FETCH_PROFILE_REQUESTED, CLEAR_PROFILE_REQUESTED
} from './actionTypes';

export const loginUser = (payload,successCb,failureCb) => ({
  type: LOGIN_USER_REQUESTED,
  payload,
  successCb,
  failureCb
});

export const loginGoogleUser = (payload,successCb,failureCb) => ({
  type: GOOGLE_LOGIN_USER_REQUESTED,
  payload,
  successCb,
  failureCb
});


export const registerContributor = (payload,successCb,failureCb) => ({
  type: REGISTER_CONTRIBUTOR_REQUESTED,
  payload,
  successCb,
  failureCb
});


export const registerOrganization = (payload,successCb,failureCb) => ({
  type: REGISTER_ORGANIZATION_REQUESTED,
  payload,
  successCb,
  failureCb
});

export const verifyOrganization = (payload,successCb,failureCb) => ({
  type: VERIFY_ORGANIZATION_REQUESTED,
  payload,
  successCb,
  failureCb
});


export const forgotPassword = (payload,successCb,failureCb) => ({
  type: FORGOT_PASSWORD_REQUESTED,
  payload,
  successCb,
  failureCb
});


export const sendOtp = (payload,successCb,failureCb) => ({
  type: SEND_OTP_REQUESTED,
  payload,
  successCb,
  failureCb
});


export const verifyOtp = (payload,successCb,failureCb) => ({
  type: VERIFY_OTP_REQUESTED,
  payload,
  successCb,
  failureCb
});

export const fetchProfileDetails = (payload,successCb,failureCb) => ({
  type: FETCH_PROFILE_REQUESTED,
  payload,
  successCb,
  failureCb
});

export const clearProfile = () => ({
  type: CLEAR_PROFILE_REQUESTED
});
