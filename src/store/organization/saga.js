import {call,takeEvery,put} from 'redux-saga/effects'
import {mockData} from '../../utils/mock';
import {disableLoader,enableLoader} from '../app/reducer';
import {
  FETCH_CONTRIBUTOR_COMPLETED_REQUEST,
  FETCH_CONTRIBUTOR_CURRENT_REQUEST,
  FETCH_CONTRIBUTOR_SEARCH_REQUEST,
  FETCH_ORGANIZATION_COMPLETED_REQUEST,
  FETCH_ORGANIZATION_CURRENT_REQUEST
} from './actionTypes';

function* fetchOrganizationCurrentRequest(action) {
  try {
    yield put(enableLoader());
    yield call(mockApi,300);
    const data = mockData.org.currentRequest;
    action?.successCb(data);
    yield put(disableLoader());
  } catch(e) {
    yield call(mockApi,300);
    yield put(disableLoader());
    action?.failureCb(e.message);
  }
}


function* fetchOrganizationCompletedRequest(action) {
  try {
    yield put(enableLoader());
    yield call(mockApi,300);
    const data = mockData.org.completedRequest;
    action?.successCb(data);
    yield put(disableLoader());
  } catch(e) {
    yield call(mockApi,300);
    yield put(disableLoader());
    action?.failureCb(e.message);
  }
}

function* fetchContributorSearchRequest(action) {
  try {
    yield put(enableLoader());
    yield call(mockApi,300);
    const data = mockData.cont.searchRequest;
    action?.successCb(data);
    yield put(disableLoader());
  } catch(e) {
    yield call(mockApi,300);
    yield put(disableLoader());
    action?.failureCb(e.message);
  }
}

function* fetchContributorCurrentRequest(action) {
  try {
    yield put(enableLoader());
    yield call(mockApi,300);
    const data = mockData.cont.currentRequest;
    action?.successCb(data);
    yield put(disableLoader());
  } catch(e) {
    yield call(mockApi,300);
    yield put(disableLoader());
    action?.failureCb(e.message);
  }
}

function* fetchContributorCompletedRequest(action) {
  try {
    yield put(enableLoader());
    yield call(mockApi,300);
    const data = mockData.cont.completedRequest;
    action?.successCb(data);
    yield put(disableLoader());
  } catch(e) {
    yield call(mockApi,300);
    yield put(disableLoader());
    action?.failureCb(e.message);
  }
}


const mockApi = (time) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve();
    },time);
  })
};

function* organizationSaga() {
  yield takeEvery(FETCH_ORGANIZATION_CURRENT_REQUEST,fetchOrganizationCurrentRequest);
  yield takeEvery(FETCH_ORGANIZATION_COMPLETED_REQUEST,fetchOrganizationCompletedRequest);
  yield takeEvery(FETCH_CONTRIBUTOR_SEARCH_REQUEST,fetchContributorSearchRequest);
  yield takeEvery(FETCH_CONTRIBUTOR_CURRENT_REQUEST,fetchContributorCurrentRequest);
  yield takeEvery(FETCH_CONTRIBUTOR_COMPLETED_REQUEST,fetchContributorCompletedRequest);
}

export default organizationSaga;