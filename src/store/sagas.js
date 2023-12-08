import { all, fork } from 'redux-saga/effects';

import userSaga from './user/saga';

export default function* sagas() {
  yield all([fork(userSaga)]);
}
