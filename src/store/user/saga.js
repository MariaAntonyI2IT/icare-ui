import {put,call,takeEvery} from 'redux-saga/effects'
import {login,loginGoogle} from '../../services/user';
import CryptoJS from 'crypto-js';
import {
  FORGOT_PASSWORD_REQUESTED,GOOGLE_LOGIN_USER_REQUESTED,LOGIN_USER_REQUESTED,
  REGISTER_CONTRIBUTOR_REQUESTED,REGISTER_ORGANIZATION_REQUESTED,SEND_OTP_REQUESTED,VERIFY_ORGANIZATION_REQUESTED,VERIFY_OTP_REQUESTED
} from './actionTypes';
import {updateContributorProfile} from './reducer';
import {enableLoader,disableLoader} from './../app/reducer';

function* loginUser(action) {
  try {
    yield put(enableLoader());
    const {email,password} = action.payload;
    const hmac = CryptoJS.HmacSHA512(password,process.env.REACT_APP_PASSWORD_HASH_KEY);
    const hashedPassword = hmac.toString(CryptoJS.enc.Hex);
    const response = yield call(login,email,hashedPassword);
    yield call(mockApi,2000);
    const mockdata = {
      email: response.data.username,
      firstName: response.data.firstName,
      lastName: response.data.lastName
    }
    yield put(updateContributorProfile(mockdata));
    yield put(disableLoader());
    action.successCb();
  } catch(e) {
    yield call(mockApi,2000);
    yield put(disableLoader());
    action.failureCb(e.response?.data?.message || e.message);
  }
}

function* loginGoogleUser(action) {
  try {
    yield put(enableLoader());
    const {accessToken} = action.payload;
    const profile = yield call(loginGoogle,accessToken)
    yield call(mockApi,1000);
    const mockdata = {
      email: profile.email,
      firstName: profile.given_name,
      lastName: profile.family_name
    }
    yield put(updateContributorProfile(mockdata));
    yield put(disableLoader());
    action.successCb();
  } catch(e) {
    yield call(mockApi,2000);
    yield put(disableLoader());
    action.failureCb(e.response?.data?.message || e.message);
  }
}

function* rgisterContributor(action) {
  try {
    yield put(enableLoader());
    yield call(mockApi,2000);
    yield put(disableLoader());
    action.successCb();
  } catch(e) {
    yield call(mockApi,2000);
    yield put(disableLoader());
    action.failureCb(e.message);
  }
}

function* rgisterOrganization(action) {
  try {
    yield put(enableLoader());
    yield call(mockApi,2000);
    yield put(disableLoader());
    action.successCb();
  } catch(e) {
    yield call(mockApi,2000);
    yield put(disableLoader());
    action.failureCb(e.message);
  }
}

function* verifyOrganization(action) {
  try {
    yield call(mockApi,2000);
    const mockData = {
      uid: 'IC2666',
      name: 'BRAVE VISION SPORTS FOUNDATION',
      regNo: 'U85300TN2021NPL148796',
      ngoId: 'TN/2022/0316055',
      state: 'TAMIL NADU',
      email: 'sbravevisionsportsacademy21'

    };
    action.successCb(mockData);
  } catch(e) {
    yield call(mockApi,2000);
    action.failureCb(e.message);
  }
}

function* forgotPassword(action) {
  try {
    yield put(enableLoader());
    yield call(mockApi,2000);
    yield put(disableLoader());
    action.successCb();
  } catch(e) {
    yield call(mockApi,2000);
    yield put(disableLoader());
    action.failureCb(e.message);
  }
}

function* sendOtp(action) {
  try {
    yield call(mockApi,2000);
    action.successCb();
  } catch(e) {
    yield call(mockApi,2000);
    action.failureCb(e.message);
  }
}

function* verifyOtp(action) {
  try {
    yield call(mockApi,2000);
    action.successCb();
  } catch(e) {
    yield call(mockApi,2000);
    action.failureCb(e.message);
  }
}

const mockApi = (time) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve();
    },time);
  })
};

function* userSaga() {
  yield takeEvery(LOGIN_USER_REQUESTED,loginUser);
  yield takeEvery(GOOGLE_LOGIN_USER_REQUESTED,loginGoogleUser);
  yield takeEvery(REGISTER_CONTRIBUTOR_REQUESTED,rgisterContributor);
  yield takeEvery(REGISTER_ORGANIZATION_REQUESTED,rgisterOrganization);
  yield takeEvery(VERIFY_ORGANIZATION_REQUESTED,verifyOrganization);
  yield takeEvery(FORGOT_PASSWORD_REQUESTED,forgotPassword);
  yield takeEvery(SEND_OTP_REQUESTED,sendOtp);
  yield takeEvery(VERIFY_OTP_REQUESTED,verifyOtp);
}

export default userSaga;