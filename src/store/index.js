import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware),
});
sagaMiddleware.run(sagas);
export default store;