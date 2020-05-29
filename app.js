import Vue from 'vue';
import axios from 'axios';

import router from './src/router';
import stores from './src/stores';
import App from './src/app.vue';

// axios.defaults.baseURL = 'http://localhost:3000/v1';

// if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = '/v1';
// } else {
//   axios.defaults.baseURL = 'http://localhost:3000/v1';
// }
axios.interceptors.request.use((config) => {
  const accessToken = store.getters['Authenticate/getAccessToken'];
  if (accessToken) {
    config.headers.common['Authorization'] = 'Bearer ' + accessToken;
  }
  return config;
});

new Vue({
  router: router,
  store: stores,
  el: '#app',
  created() {},
  render: (h) => h(App),
});
