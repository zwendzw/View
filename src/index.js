import Vue from 'vue';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router/router';
import store from './stores';
import App from './app.vue';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

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
