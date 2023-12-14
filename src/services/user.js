import axios from 'axios';

export const login = (username,password) => {
  const data = new FormData();
  data.append('username',username);
  data.append('password',password);
  return axios({
    method: 'POST',
    url: '/login',
    data,
    headers: {'Content-Type': 'multipart/form-data'}
  });
};


export const loginGoogle = (accessToken) => {
  return axios({
    method: 'POST',
    url: `/login/oAuth?token=${encodeURIComponent(
      accessToken
    )}`
  });
};

export const fetchProfile = () =>
  axios({
    method: 'post',
    url: '/profile'
  });