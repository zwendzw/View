import Vue from 'vue';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRecaptcha from 'vue-recaptcha';
import router from './router/router';
import store from './stores';
import App from './app.vue';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('VueRecaptcha', VueRecaptcha);

axios.interceptors.request.use((config) => {
  // config.data = JSON.stringify(config.data);
  config.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Content-Type':
      'application/json;charset=utf-8',
  };
  const accessToken = store.getters['Authenticate/getAccessToken'];
  if (accessToken) {
    config.headers.common['Authorization'] = 'Bearer ' + accessToken;
  }
  return config;
});
// eslint-disable-next-line no-new
new Vue({
  vuetify,
  el: '#app',
  mounted() {},
  router,
  store,
  components: {
    App,
  },
  template: '<App />',
});

if (module.hot) {
  module.hot.accept();
}
