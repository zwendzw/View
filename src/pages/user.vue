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
              Error
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
                APPLY
              </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Account"
                      name="account"
                      prepend-icon="person"
                      type="text"
                      v-model="apply.account"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn id="apply" color="ncb-yellow" @click="applyForOtp">
                    Apply
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
      applyEnable: true,
      enableTime: 0,
      countDownTimer: 3000,
      dialog: {
        errorDialog: false,
        errorMessage: '',
      },
      apply: {
        account: '',
      },
    };
  },
  created() {
    this.getEnableTime();
  },
  methods: {
    getEnableTime() {
      this.enableTime = Number(window.sessionStorage.getItem('timestamp'));
    },
    setEnabelTime() {
      window.sessionStorage.setItem('timestamp', Date.parse(new Date()));
    },
    checkCountDownTimer() {
      const dateTimeNow = Date.parse(new Date());
      this.getEnableTime();
      if (this.enableTime === 0) {
        this.setEnabelTime();
      } else {
        const timeDiff = dateTimeNow - this.enableTime;
        if (timeDiff > this.countDownTimer) {
          console.log(
              dateTimeNow,
              this.enableTime, timeDiff);
        }
      }
    },
    applyForOtp(event) {
      this.checkCountDownTimer();
      this.$store.dispatch('ApplyForOtp/setAccount', {
        account: this.apply.account,
      });
      this.$store.dispatch('ApplyForOtp/apply', {}).then((result) => {
        console.log('result', result);
        if (result === '1') {
          this.$router.replace({
            name: 'unlock',
          });
        } if (result === '-999') {
          this.dialog.errorDialog = true;
          // --- Error message 請調整爲 component!
          this.dialog.errorMessage = '請求次數過多，請稍候再試';
          // ---
          console.log('error', this.dialog.errorDialog);
        } else {
          this.dialog.errorDialog = true;
          this.dialog.errorMessage = 'Error';
        }
      });
    },
  },
};
</script>
