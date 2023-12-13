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

export const loginGoogle = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${encodeURIComponent(
      accessToken
    )}`
  );
  return await response.json();
};

export const fetchProfile = () =>
  axios({
    method: 'post',
    url: '/profile'
  });