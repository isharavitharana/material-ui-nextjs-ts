import axios from 'axios';
import * as Cookie from 'universal-cookie';

const isBrowser = typeof window !== 'undefined';

const cookie = new Cookie.default();

let cachedToken: string = '';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

const getToken = () => {
  if (!isBrowser) {
    return null;
  }
  if (cachedToken) {
    return cachedToken;
  }
  cachedToken = cookie.get('userAuthToken');
  return cachedToken;
};

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (config.url && isBrowser && !config.url.includes('/signin')) {
      const key = getToken();

      if (key && config.headers) {
        config.headers.Authorization = `${key}`;
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

import User from './user';

const UserSVC = User(api);

export { UserSVC };
