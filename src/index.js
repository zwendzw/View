import Vue from 'vue';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRecaptcha from 'vue-recaptcha';
import PincodeInput from 'vue-pincode-input';
import router from './router/router';
import store from './stores';
import App from './app.vue';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('VueRecaptcha', VueRecaptcha);
Vue.component('PincodeInput', PincodeInput);

axios.defaults.baseURL = 'http://mis.nextbank.com.tw/';
axios.interceptors.request.use((config) => {
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
