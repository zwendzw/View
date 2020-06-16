import axios from 'axios';

export default {
  namespaced: true,
  state: {
    otpSn: '',
    account: '',
  },
  actions: {
    async apply({commit}, {account}) {
      try {
        const result = await axios.get(`/api/otp/apply/${account}`);
        const otpSn = result.data.data || '';
        const status = result.data.status || '-999';
        console.log('time', Date.parse(new Date()));
        if (status === '1') { // Error Code is String.
          const commitData = {
            otpSn,
            account,
          };
          commit('setSn', commitData);
          window.sessionStorage.setItem('otpSn', otpSn);
          window.sessionStorage.setItem('account', account);
        } return (status);
      } catch (error) {
        const response = error.response || {};
        console.log(response);
        return (response);
      }
    },
  },
  mutations: {
    setSn(state, data) {
      console.log('commit1', data);
      state.otpSn = data.otpSn;
      state.account = data.account;
    },
  },
  getters: {
    getSn(state) {
      return state.otpSn;
    },
    getAccount(state) {
      return state.account;
    },
  },
};
