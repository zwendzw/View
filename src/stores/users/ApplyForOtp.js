import axios from 'axios';

export default {
  namespaced: true,
  state: {
    OtpSn: '',
  },
  actions: {
    async apply({commit}, {account}) {
      try {
        const result = await axios.get(`/api/otp/apply/${account}`);
        const otpSn = result.data.data || '';
        const respone = result.data.message || '';
        if (result.data.status === 1) {
          commit('setSn', otpSn);
          window.sessionStorage.setItem('setSn', 'otpSn');
          window.sessionStorage.setItem('count', 'otpSn');
        } return (respone);
        window.sessionStorage.setItem(set);
      } catch (error) {
        const response = error.response || {};
        console.log(response);
        return (response);
      }
    },
  },
  mutations: {
    setSn(state, data) {
      state.OtpSn = data;
    },
  },
  getters: {
    getSn(state) {
      return state.OtpSn;
    },
  },
};
