import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './users/Auth';
import ApplyForOtp from './users/ApplyForOtp';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    ApplyForOtp,
  },
});
