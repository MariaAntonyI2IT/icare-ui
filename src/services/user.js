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

export const createRequest = (data) =>
  axios({
    method: 'post',
    url: '/request/create',
    data
  });

export const fetchRequestList = (data) =>
  axios({
    method: 'post',
    url: '/request-list',
    data
  });

export const donateProductService = (data) =>
  axios({
    method: 'post',
    url: '/product-order',
    data
  });


export const fetchContributorCurrentListService = (id) =>
  axios({
    method: 'post',
    url: `/product-contributed/unacknowledged?contributedId=${id}`
  });

export const fetchContributorCompletedService = (id) =>
  axios({
    method: 'post',
    url: `/product-contributed/acknowledged?contributedId=${id}`
  });

export const fetchOrganizationCurrentListService = (id) =>
  axios({
    method: 'post',
    url: `/request/uncompleted?orgId=${id}`
  });

export const fetchOrganizationCompletedService = (id) =>
  axios({
    method: 'post',
    url: `/request/completed?orgId=${id}`
  });


export const acknowledgeProductService = (id) =>
  axios({
    method: 'post',
    url: `/product-acknowledge?productId=${id}`
  });

export const sendOtpService = (data) =>
  axios({
    method: 'post',
    url: `/email/send-otp`,
    data
  });

export const verifyOtpService = (data) =>
  axios({
    method: 'post',
    url: `/email/validate-otp`,
    data
  });

export const createContributorAccountService = (data) =>
  axios({
    method: 'post',
    url: `/contributor/register`,
    data
  });

export const createOrganizationAccountService = (data) =>
  axios({
    method: 'post',
    url: `/organization/register`,
    data
  });

export const verifyOrganizationAccountService = (id) =>
  axios({
    method: 'get',
    url: `/organization/verify-org-id?ngoId=${encodeURIComponent(id)}`
  });
