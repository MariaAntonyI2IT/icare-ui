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
