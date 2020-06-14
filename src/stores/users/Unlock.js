// eslint-disable-next-line no-unused-vars
import axios from 'axios';

let OtpSn;

export default {
  namespaced: true,
  state: {
  },
  actions: {
    async unlockAccount({commit}, {account, otpCode}) {
      // OtpSn = this.getters['ApplyForOtp/getSn'];
      OtpSn = '060e168c820a4d979e531b090171d1e5';
      console.log(
          account,
          otpCode,
          OtpSn,
      );
      try {
        const result = {
          'data': {
            'status': '-99',
            'message': 'OTP Code is Unavailable.',
            'data': null,
          },
          'status': 200,
        };
        // const result = {
        //   'data': {
        //     'status': '1',
        //     'message': 'success',
        //     'data': true,
        //   },
        // };
        // const result = await axios.post('api/user/unlock', {
        //   account,
        //   OtpSn,
        //   otpCode,
        // });
        const response = result.data.message;
        console.log(response);
        if (result.data.status === 1) {
          console.log(response);
          return true;
        } return false;
      } catch (error) {
        const response = error.response || {};
        console.log(response);
        return (response);
      }
    },
  },
  mutations: {
  },
  getters: {
  },
};
