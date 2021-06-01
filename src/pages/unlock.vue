<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <!-- errorDialog Begin -->
        <v-dialog
          v-model="dialog.errorDialog"
          width="300"
        >
          <v-card color="grey lighten-5">
            <v-card-title primary-title color="red lighten-5">
              驗證錯誤！
            </v-card-title>
            <v-card-text>
              {{dialog.errorMessage}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="deep-orange darken-3"
                text
                @click="dialog.errorDialog = false"
              >
                <svg class="bi bi-x" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M11.854 4.146a.5.5 0 0 1 0
                    .708l-7
                    7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1
                    .708 0z"/>
                <path fill-rule="evenodd"
                  d="M4.146 4.146a.5.5 0 0 0 0
                  .708l7 7a.5.5 0 0 0
                  .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
              </svg>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- error dialog end -->
        <!-- successDialog Begin -->
        <v-dialog
          v-model="dialog.successDialog"
          persistent
          width="300"
        >
          <v-card color="ncb-dark" dark>
            <v-card-text>
              <p>{{dialog.successMessage}}</p>
              <v-btn color="success"
                @click="dialog.successDialog = false"
              >
                Close
              </v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- processingBar Begin -->
        <v-dialog
          v-model="dialog.processingBar"
          persistent
          width="300"
        >
          <v-card color="primary" dark>
            <v-card-text>
              Please waiting
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-card-title
              primary-title class="
                ncb-yellow
                subtitle-1
                font-weight-bold
                justify-center
              ">
                Unlock
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="ACCOUNT"
                    name="account"
                    prepend-icon="person"
                    type="text"
                    v-model="unlock.account"
                    :disabled="unlock.account.length > 0"
                  />
                  <!-- <v-text-field
                    id="one_time_password"
                    label="CODE"
                    name="one_time_password"
                    prepend-icon="lock"
                    v-model="unlock.otpCode"
                  /> -->
                </v-form>

                <div class="text-center">
                  <PincodeInput
                    v-model="unlock.otpCode"
                    placeholder="0"
                    :length="6"
                  />
                </div>
              </v-card-text>
              <v-card-actions class="justify-space-around">
                <v-btn
                  v-if="enableTime <= 0"
                  color="gery lighten-5"
                  :disabled="!resendEnable"
                  @click="resend"
                >
                  Resend
                </v-btn>
                <v-btn
                  v-else
                  color="gery"
                  :disabled="!resendEnable"
                >
                  Resend({{ enableTime }})
                </v-btn>
                <v-btn
                  color="ncb-yellow"
                  @click="unlockAccount"
                >
                  Unlock
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      dialog: {
        errorDialog: false,
        errorMessage: 'Fail',
      },
      unlock: {
        account: '',
        otpCode: '',
      },
      resendEnable: false,
      enableTime: 3,
    };
  },
  created() {
    this.enable();
    this.unlock.account = this.$store.getters['ApplyForOtp/getAccount'] ||
      window.sessionStorage.getItem('account');
  },
  methods: {
    resend() {
      this.resendEnable = false;
      this.$store.dispatch('ApplyForOtp/apply', {
      }).then((result) => {
        console.log('result', result);
        if (result === '1') {
          this.enableTime = 60;
          this.enable();
          // 成功後重新倒數時間
        } else {
          // 失敗後重新倒數，並跳出提示字
          this.dialog.errorDialog = true;
          this.dialog.errorMessage = '請求次數過多，請稍候再試';
          console.log(result);
        }
      });
    },
    back() {
      this.$router.replace({
        name: 'user',
      });
    },
    enable() {
      const enableTimer = setInterval(() => {
        if (this.enableTime > 0) {
          this.enableTime--;
        } else {
          clearInterval(enableTimer);
          this.resendEnable = true;
        }
      }, 1000);
    },
    async unlockAccount(event) {
      await this.$store
          .dispatch('Unlock/unlockAccount', {
            account: this.unlock.account,
            otpCode: this.unlock.otpCode,
          })
          .then(
              (result) => {
                if (result === '1') {
                  this.$router.replace({
                    name: 'hello',
                  });
                } if (result === '0') {
                  this.dialog.errorDialog = true;
                  this.dialog.errorMessage = '解鎖失敗';
                } if (result === '-99') {
                  this.$router.replace({
                    name: 'error',
                  });
                } else {
                  this.dialog.errorDialog = true;
                  this.dialog.errorMessage = '驗證失敗';
                }
              },
              (error) => {
                this.dialog.processingBar = false;
                this.errorMessage = error;
              },
          );
    },
  },
};
</script>
