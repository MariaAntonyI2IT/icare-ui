import {put,call,takeEvery} from 'redux-saga/effects'
import {login,loginGoogle,fetchProfile} from '../../services/user';
import CryptoJS from 'crypto-js';
import {
  CLEAR_PROFILE_REQUESTED,
  FETCH_PROFILE_REQUESTED,
  FORGOT_PASSWORD_REQUESTED,GOOGLE_LOGIN_USER_REQUESTED,LOGIN_USER_REQUESTED,
  REGISTER_CONTRIBUTOR_REQUESTED,REGISTER_ORGANIZATION_REQUESTED,SEND_OTP_REQUESTED,VERIFY_ORGANIZATION_REQUESTED,VERIFY_OTP_REQUESTED
} from './actionTypes';
import {updateContributorProfile,updateOrganizationProfile,updateToken,updateLoggedIn,updateInitialized,clearUserData} from './reducer';
import {enableLoader,disableLoader} from './../app/reducer';
import {appConfig} from '../../utils/constants';
import {setSession} from '../../utils/session';


function* loginUser(action) {
  try {
    yield put(enableLoader());
    yield put(updateInitialized(false));
    yield put(updateLoggedIn(false));
    const {email,password} = action.payload;
    const hmac = CryptoJS.HmacSHA512(password,process.env.REACT_APP_PASSWORD_HASH_KEY);
    const hashedPassword = hmac.toString(CryptoJS.enc.Hex);
    const {
      headers: {authorization: token}
    } = yield call(login,email,hashedPassword);
    setSession(appConfig.token,token);
    yield put(updateToken(token));
    const {data} = yield call(fetchProfile);
    if(data.contributor) {
      yield put(updateContributorProfile(data.contributor));
    } else {
      yield put(updateOrganizationProfile(data.organization));
    }
    yield put(disableLoader());
    yield put(updateLoggedIn(true));
    yield put(updateInitialized(true));
    action?.successCb();
  } catch(e) {
    yield put(updateLoggedIn(false));
    yield put(updateInitialized(true));
    yield put(disableLoader());
    action?.failureCb(e.response?.data?.message || e.message);
  }
}

function* fetchProfileDetails(action) {
  try {
    yield put(enableLoader());
    yield put(updateInitialized(false));
    yield put(updateLoggedIn(false));
    const {data} = yield call(fetchProfile);
    if(data.contributor) {
      yield put(updateContributorProfile(data.contributor));
    } else {
      yield put(updateOrganizationProfile(data.organization));
    }
    yield put(disableLoader());
    yield put(updateLoggedIn(true));
    yield put(updateInitialized(true));
  } catch(e) {
    yield put(updateInitialized(true))
    yield put(updateLoggedIn(false));
    yield put(disableLoader());
  }
}

function* loginGoogleUser(action) {
  try {
    yield put(enableLoader());
    yield put(updateInitialized(false));
    yield put(updateLoggedIn(false));
    const {accessToken} = action.payload;
    const {
      headers: {authorization: token}
    } = yield call(loginGoogle,accessToken);
    setSession(appConfig.token,token);
    yield put(updateToken(token));
    const {data} = yield call(fetchProfile);
    if(data.contributor) {
      yield put(updateContributorProfile(data.contributor));
    } else {
      yield put(updateOrganizationProfile(data.organization));
    }
    yield put(disableLoader());
    yield put(updateLoggedIn(true));
    yield put(updateInitialized(true));
    action?.successCb();
  } catch(e) {
    yield put(updateInitialized(true))
    yield put(updateLoggedIn(false));
    yield put(disableLoader());
    action?.failureCb(e.response?.data?.message || e.message);
  }
}

function* rgisterContributor(action) {
  try {
    yield put(enableLoader());
    yield call(mockApi,1500);
    yield put(disableLoader());
    action?.successCb();
  } catch(e) {
    yield call(mockApi,1500);
    yield put(disableLoader());
    action?.failureCb(e.message);
  }
}

function* rgisterOrganization(action) {
  try {
    yield put(enableLoader());
    yield call(mockApi,1500);
    yield put(disableLoader());
    action?.successCb();
  } catch(e) {
    yield call(mockApi,1500);
    yield put(disableLoader());
    action?.failureCb(e.message);
  }
}

function* verifyOrganization(action) {
  try {
    yield call(mockApi,1500);
    const mockData = {
      uid: 'IC-2666',
      name: 'BRAVE VISION SPORTS FOUNDATION',
      registrationNumber: 'U85300TN2021NPL148796',
      ngoId: 'TN/2022/0316055',
      state: 'TAMIL NADU',
      email: 'sbravevisionsportsacademy21@gmail.com'
    };
    action?.successCb(mockData);
  } catch(e) {
    yield call(mockApi,1500);
    action?.failureCb(e.message);
  }
}

function* forgotPassword(action) {
  try {
    yield put(enableLoader());
    yield call(mockApi,1500);
    yield put(disableLoader());
    action?.successCb();
  } catch(e) {
    yield call(mockApi,1500);
    yield put(disableLoader());
    action?.failureCb(e.message);
  }
}

function* sendOtp(action) {
  try {
    yield call(mockApi,1500);
    action?.successCb();
  } catch(e) {
    yield call(mockApi,1500);
    action?.failureCb(e.message);
  }
}

function* verifyOtp(action) {
  try {
    yield call(mockApi,1500);
    action?.successCb();
  } catch(e) {
    yield call(mockApi,1500);
    action?.failureCb(e.message);
  }
}


function* clearProfile() {
  yield put(clearUserData());
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
  yield takeEvery(FETCH_PROFILE_REQUESTED,fetchProfileDetails);
  yield takeEvery(CLEAR_PROFILE_REQUESTED,clearProfile);
}

export default userSaga;