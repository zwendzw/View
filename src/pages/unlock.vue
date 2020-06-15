<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <!-- errorDialog Begin -->
        <v-dialog
          v-model="dialog.errorDialog"
          persistent
          width="300"
        >
          <v-card color="ncb-gery" dark>
            <v-card-text>
              <p>{{dialog.errorMessage}}</p>
              <v-btn color="warning" @click="dialog.errorDialog = false">Close</v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- successDialog Begin -->
        <v-dialog
          v-model="dialog.successDialog"
          persistent
          width="300"
        >
          <v-card color="ncb-gery" dark>
            <v-card-text>
              <p>{{dialog.successMessage}}</p>
              <v-btn color="success" @click="dialog.successDialog = false">Close</v-btn>
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
                  <v-text-field
                    id="one_time_password"
                    label="CODE"
                    name="one_time_password"
                    prepend-icon="lock"
                    v-model="unlock.otpCode"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-space-around">
                <v-btn
                  v-if="enableTime > 1"
                  color="ncb-gery"
                  :disabled="!resendEnable"
                >
                  Back({{ enableTime }})
                </v-btn>
                <v-btn
                  v-else
                  color="ncb-gery"
                  :disabled="!resendEnable"
                  @click="back"
                >
                  Back
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
        processingBar: false,
        errorDialog: false,
        successDialog: false,
        errorMessage: '',
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
    this.unlock.account = this.$store.getters['ApplyForOtp/getAccount'];
  },
  methods: {
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
      this.dialog.processingBar = true;
      await this.$store
          .dispatch('Unlock/unlockAccount', {
            account: this.unlock.account,
            otpCode: this.unlock.otpCode,
          })
          .then(
              (result) => {
                if (result !== '1') {
                  setTimeout(() => {
                    this.dialog.processingBar = false;
                    this.dialog.errorDialog = true;
                    this.dialog.errorMessage = 'error';
                  }, 1000);
                }
                setTimeout(() => {
                  this.dialog.processingBar = false;
                  this.dialog.successDialog = true;
                  this.dialog.successMessage = 'success'
                }, 1000);
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
