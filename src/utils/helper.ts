import * as Cookie from 'universal-cookie';
const cookie = new Cookie.default();

export const setToken = (token: string) => {
  if (token) {
    cookie.set('userAuthToken', token, { path: '/' });
  }
};
