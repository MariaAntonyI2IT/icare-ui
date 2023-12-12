import axios from 'axios';
import {fetchProfileDetails} from './../store/user/action';
import {updateInitialized} from './../store/user/reducer';

export const setupInterceptors = (store) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.interceptors.request.use(
    (request) => {
      const token = store.getState().user.token;
      request.headers.Authorization = token || '';
      request.headers.tenantId = 0;
      request.headers['App-Version'] = '1.0.8';
      return request;
    },
    (error) => Promise.reject(error)
  );

  if(store.getState().user.token) {
    store.dispatch(fetchProfileDetails());
  } else {
    store.dispatch(updateInitialized(true));
  }
};
