import { createServer } from 'miragejs';

const users = [
  {
    id: '1',
    name: 'Luke',
    email: 'admin@gmail.com',
    password: 'password',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiVGhpcyBpcyBUZXN0IFRva2VuIiwiaWF0IjoxNjkxOTI4MTE2fQ.W8_eIC8qmI2llstYRTDogYvqZRiWjUMo-_yn0VT20kE',
  },
  {
    id: '2',
    name: 'Leia',
    email: 'admin1@gmail.com',
    password: 'password1',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiVGhpcyBpcyBUZXN0IFRva2VuIiwiaWF0IjoxNjkxOTI4MTk5fQ.4lrD19aj8aSOPkrY8eGRFTdH1wfwtG5MEYWQqYkRQqA',
  },
  {
    id: '3',
    name: 'Ishara',
    email: 'user@gmail.com',
    password: 'password3',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiVGhpcyBpcyBUZXN0IFRva2VuIiwiaWF0IjoxNjkxOTI4MjIwfQ.amFMwa0F8S2UUjE7auk1WV5xPxaQ8luHYmhXm68D468',
  },
  {
    id: '4',
    name: 'Malaka',
    email: 'malaka@gmail.com',
    password: 'password4',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiVGhpcyBpcyBUZXN0IFRva2VuIiwiaWF0IjoxNjkxOTI4NDM1fQ.e4x7l3zoGr_k2ExVuVi4DxwaTd2O0H3DtYzjm8tn29I',
  },
];

createServer({
  routes() {
    this.get('/api/user/:id', (schema, request) => {
      const userId = request.params.id;
      const user = users.find((user) => user.id === userId);
      if (user && user.token === request.requestHeaders.Authorization) {
        return { code: 200, data: user };
      } else {
        return { code: 401, data: null };
      }
      // return { data: user };
    });
    this.post('/api/signin', (schema, request) => {
      console.log('request', request);
      let attrs = JSON.parse(request.requestBody);

      const user = users.find((user) => user.email === attrs.email);
      if (user) {
        if (user.password === attrs.password) {
          return { code: 200, data: user };
        } else {
          return { code: 401, data: null };
        }
      } else {
        return { code: 400, data: null };
      }
    });
  },
});
// const jwt = require('jsonwebtoken');
// const encodedToken = jwt.sign({ message: 'This is Test Token' }, 'token');
