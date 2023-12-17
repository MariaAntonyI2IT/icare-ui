import { all, fork } from 'redux-saga/effects';

import userSaga from './user/saga';
import organizationSaga from './organization/saga';

export default function* sagas() {
  yield all([fork(userSaga)]);
  yield all([fork(organizationSaga)]);
}
