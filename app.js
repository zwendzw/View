import Vue from 'vue';
// import axios from 'axios';

import router from './src/router';
import stores from './src/stores';
import App from './src/app.vue';

// axios.defaults.baseURL = 'http://localhost:3000/v1';

// if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = '/v1';
// } else {
//   axios.defaults.baseURL = 'http://localhost:3000/v1';
// }
// axios.interceptors.request.use((config) => {
//   config.data = JSON.stringify(config.data);
//   config.headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
//     'Access-Control-Max-Age': '86400',
//     'Access-Control-Content-Type':
//       'application/x-www-form-urlencoded; charset=utf-8',
//   };
//   const accessToken = store.getters['Authenticate/getAccessToken'];
//   if (accessToken) {
//     config.headers.common['Authorization'] = 'Bearer ' + accessToken;
//   }
//   return config;
// });

new Vue({
  router: router,
  store: stores,
  el: '#app',
  created() {},
  render: (h) => h(App),
});
