import axios from 'axios';

export default {
  namespaced: true,
  state: {
    token: '',
  },
  actions: {
    apply({commit}, {account}) {
      console.log(account);
      return new Promise((resolve, reject) => {
        commit('setToken', 'dbdbb60a89e640ed8f5a34da8d58f82f');
        console.log(this.getters['ApplyForOtp/getToken']);
        resolve(true);
        // axios.get(`http://mis.nextbank.com.tw/api/otp/apply/${account}`)
        //     .then((response) => {
        //       commit('setToken', response.data.data);
        //       resolve(true);
        //     }).catch((error) => {
        //       const response = error.response || {};
        //       reject(response.data || {});
        //     });
      });
    },
    changePassword({commit}, {account, currentPassword, newPassword}) {
      console.log(account, currentPassword, newPassword);
      return new Promise((resolve, reject) => {
        axios.put('http://localhost:3000/password', {
          account,
          currentPassword,
          newPassword,
        }).then((response) => {
          if (response.status && response.status === 200) {
            resolve(true);
          }
        }).catch((error) => {
          const response = error.response || {};
          reject(response.data || {});
        });
      });
    },
  },
  mutations: {
    setToken(state, data) {
      state.token = data;
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
};
