import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './users/Auth';
import ApplyForOtp from './users/ApplyForOtp';
import Unlock from './users/Unlock';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    ApplyForOtp,
    Unlock,
  },
});
