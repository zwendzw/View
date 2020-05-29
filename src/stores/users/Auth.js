import axios from 'axios';

export default {
  namespaced: true,
  state: {},
  actions: {
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
  mutations: {},
  getters: {},
};
