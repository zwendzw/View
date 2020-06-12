<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-dialog
          v-model="dialog.resetSuccess"
          persistent
          width="300"
        >
          <v-card color="primary" dark>
            <v-card-text>
              <p>Success！！！</p>
              <v-btn color="success" :to="{name: 'hello'}" >Close</v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-tabs
                fixed-tabs
                color="ncb-dark"
                background-color="yellow accent-3"
                slider-color="grey darken-3"
              >
                <v-tab class="subtitle-1 font-weight-bold" :key="1">
                  Apply
                </v-tab>
                <v-tab class="subtitle-1 font-weight-bold" :key="2">
                  Unlock
                </v-tab>
                <v-tab-item :key="1">
                  <v-card>
                    <v-card-text>
                      <v-form>
                        <v-text-field
                          label="Account"
                          name="account"
                          prepend-icon="person"
                          type="text"
                          v-model="apply.account"
                        />
                        <!-- <vue-recaptcha sitekey="
                          6Le5J6MZAAAAAFY7Yvj3jLAGRwG4gEDqaBFe0OUy
                        ">
                        </vue-recaptcha> -->
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn id="apply" color="ncb-yellow" @click="applyForOTP">
                        Apply
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                <v-tab-item :key="2">
                  <v-card>
                    <v-card-text>
                      <v-form>
                        <v-text-field
                          label="ACCOUNT"
                          name="account"
                          prepend-icon="person"
                          type="text"
                          v-model="unlock.account"
                        />

                        <v-text-field
                          id="one_time_password"
                          label="CODE"
                          name="one_time_password"
                          prepend-icon="lock"
                          v-model="unlock.oneTimePassword"
                        />
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn
                        id="login"
                        color="ncb-yellow"
                        @click="unlockAccount"
                      >
                        Unlock
                      </v-btn>
                      <v-dialog
                        v-model="dialog.resetPassword"
                        persistent
                        width="300"
                      >
                        <v-card color="primary" dark>
                          <v-card-text>
                            Please stand by
                            <v-progress-linear
                              indeterminate
                              color="white"
                              class="mb-0"
                            ></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
              </v-tabs>
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
        resetPassword: false,
        resetSuccess: false,
      },
      apply: {
        account: '',
      },
      unlock: {
        account: '',
        token: '',
        oneTimePassword: '',
      },
    };
  },
  props: {},
  methods: {
    async applyForOTP(event) {
      await this.$store.dispatch('ApplyForOtp/apply', {
        account: this.apply.account,
      }).then(
          (result) => {
            console.log('result', this);
          },
          (error) => {
            console.log('error', error);
          },
      );
    },
    async unlockAccount(event) {
      // this.dialog.resetPassword = true;
      await this.$store
          .dispatch('Unlock/unlockAccount', {
            account: this.unlock.account,
            oneTimePassword: this.unlock.oneTimePassword,
          })
          .then(
              (result) => {
                console.log('test1');
                // setTimeout(() => {
                //   this.dialog.resetPassword = false;
                //   this.dialog.resetSuccess = true;
                // }, 1000);
              },
              (error) => {
                this.dialog.resetPassword = false;
                // this.errorMessage = error;
              },
          );
    },
  },
};
</script>
