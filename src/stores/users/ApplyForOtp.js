import axios from 'axios';

export default {
  namespaced: true,
  state: {
    otpSn: '',
    account: '',
  },
  actions: {
    async setAccount({commit}, {account}) {
      window.sessionStorage.setItem('account', account);
    },
    async getAccount({commit, dispatch}) {
      const account = window.sessionStorage.getItem('account') || '';
      return account;
    },
    async apply({commit}) {
      const account = window.sessionStorage.getItem('account') || '';
      if (!account || account === '') {
        return ('Account not found');
      }
      try {
        console.log(account);
        const result = await axios.get(`/api/otp/apply/${account}`);
        const otpSn = result.data.data || '';
        const status = result.data.status || '-999';
        if (status === '1') { // Error Code is String.
          const commitData = {
            otpSn,
            account,
          };
          commit('setSn', commitData);
          window.sessionStorage.setItem('otpSn', otpSn);
        } return (status);
      } catch (error) {
        const response = error.response || {};
        console.log(response);
        return (response);
      }
    },
  },
  mutations: {
    setAccount(state, account) {
      state.account = account;
    },
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
