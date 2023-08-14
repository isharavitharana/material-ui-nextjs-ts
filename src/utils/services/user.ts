import { AxiosPromise } from 'axios';

const API_PATH = 'http://localhost:3000/api';

type API = {
  get: (url: string) => AxiosPromise;
  post: (url: string, payload: any) => AxiosPromise;
};

const User = (api: API) => {
  const signIn = (email: string, password: string) =>
    api.post(API_PATH + '/signin', {
      email: email,
      password: password,
    });

  const getUser = (id: string) => api.get(API_PATH + `/user/${id}`);
  return { signIn, getUser };
};

export default User;
