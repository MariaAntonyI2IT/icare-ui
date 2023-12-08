import {put,takeLatest} from 'redux-saga/effects'
import {USER_FETCH_REQUESTED} from './actionTypes';
import {increment} from './reducer';

function* fetchUser(action) {
  try {
    yield put(increment({aa: 7}))
  } catch(e) {
  }
}

function* userSaga() {
  yield takeLatest(USER_FETCH_REQUESTED,fetchUser)
}

export default userSaga;