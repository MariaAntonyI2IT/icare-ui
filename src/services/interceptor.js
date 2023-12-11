import axios from 'axios';

export const setupInterceptors = (store) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
};
