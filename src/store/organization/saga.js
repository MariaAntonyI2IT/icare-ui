import {call,takeEvery,put} from 'redux-saga/effects'
import {disableLoader,enableLoader} from '../app/reducer';
import {
  createRequest,fetchRequestList,donateProductService,
  fetchContributorCurrentListService,fetchContributorCompletedService,
  fetchOrganizationCurrentListService,fetchOrganizationCompletedService,acknowledgeProductService
} from '../../services/user';
import {
  FETCH_CONTRIBUTOR_COMPLETED_REQUEST,
  FETCH_CONTRIBUTOR_CURRENT_REQUEST,
  FETCH_CONTRIBUTOR_SEARCH_REQUEST,
  FETCH_ORGANIZATION_COMPLETED_REQUEST,
  ORGANIZATION_CREATE_REQUEST,
  FETCH_ORGANIZATION_CURRENT_REQUEST,
  DONATE_CONTRIBUTOR_REQUEST,
  ACKNOWLEDGE_CONTRIBUTOR_REQUEST
} from './actionTypes';

function* createOrganizationRequest(action) {
  try {
    yield put(enableLoader());
    yield call(createRequest,action.payload);
    action?.successCb();
    yield put(disableLoader());
  } catch(e) {
    yield put(disableLoader());
    action?.failureCb(e.response?.data?.message || e.message);
  }
}

function* fetchOrganizationCurrentRequest(action) {
  try {
    yield put(enableLoader());
    const {data} = yield call(fetchOrganizationCurrentListService,action.payload);
    action?.successCb(data);
    yield put(disableLoader());
  } catch(e) {
    yield put(disableLoader());
    action?.failureCb(e.response?.data?.message || e.message);
  }
}


function* fetchOrganizationCompletedRequest(action) {
  try {
    yield put(enableLoader());
    const {data} = yield call(fetchOrganizationCompletedService,action.payload);
    action?.successCb(data);
    yield put(disableLoader());
  } catch(e) {
    yield put(disableLoader());
    action?.failureCb(e.response?.data?.message || e.message);
  }
}

function* fetchContributorSearchRequest(action) {
  try {
    yield put(enableLoader());
    const {data} = yield call(fetchRequestList);
    action?.successCb(data);
    yield put(disableLoader());
  } catch(e) {
    yield put(disableLoader());
    action?.failureCb(e.response?.data?.message || e.message);
  }
}

function* fetchContributorCurrentRequest(action) {
  try {
    yield put(enableLoader());
    const {data} = yield call(fetchContributorCurrentListService,action.payload);
    action?.successCb(data);
    yield put(disableLoader());
  } catch(e) {
    yield put(disableLoader());
    action?.failureCb(e.response?.data?.message || e.message);
  }
}

function* fetchContributorCompletedRequest(action) {
  try {
    yield put(enableLoader());
    const {data} = yield call(fetchContributorCompletedService,action.payload);
    action?.successCb(data);
    yield put(disableLoader());
  } catch(e) {
    yield put(disableLoader());
    action?.failureCb(e.response?.data?.message || e.message);
  }
}

function* donateProduct(action) {
  try {
    yield put(enableLoader());
    yield call(donateProductService,action.payload);
    action?.successCb();
    yield put(disableLoader());
  } catch(e) {
    yield put(disableLoader());
    action?.failureCb(e.response?.data?.message || e.message);
  }
}

function* acknowledgeProduct(action) {
  try {
    yield put(enableLoader());
    yield call(acknowledgeProductService,action.payload);
    action?.successCb();
    yield put(disableLoader());
  } catch(e) {
    yield put(disableLoader());
    action?.failureCb(e.response?.data?.message || e.message);
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
  yield takeEvery(ORGANIZATION_CREATE_REQUEST,createOrganizationRequest);
  yield takeEvery(FETCH_ORGANIZATION_CURRENT_REQUEST,fetchOrganizationCurrentRequest);
  yield takeEvery(FETCH_ORGANIZATION_COMPLETED_REQUEST,fetchOrganizationCompletedRequest);
  yield takeEvery(FETCH_CONTRIBUTOR_SEARCH_REQUEST,fetchContributorSearchRequest);
  yield takeEvery(FETCH_CONTRIBUTOR_CURRENT_REQUEST,fetchContributorCurrentRequest);
  yield takeEvery(FETCH_CONTRIBUTOR_COMPLETED_REQUEST,fetchContributorCompletedRequest);
  yield takeEvery(DONATE_CONTRIBUTOR_REQUEST,donateProduct);
  yield takeEvery(ACKNOWLEDGE_CONTRIBUTOR_REQUEST,acknowledgeProduct);
}

export default organizationSaga;