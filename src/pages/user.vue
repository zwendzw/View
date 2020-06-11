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
                  Login
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
                          v-model="login.account"
                        />
                        <vue-recaptcha sitekey="6Le5J6MZAAAAAFY7Yvj3jLAGRwG4gEDqaBFe0OUy">
                        </vue-recaptcha>
                        <!-- <v-text-field
                          id="login_password"
                          label="Password"
                          name="password"
                          prepend-icon="lock"
                          v-model="login.password"
                          :type="showPassword ?
                          'text' : 'password'"
                          :append-icon="showPassword ?
                          'visibility' : 'visibility_off'"
                          @click:append="showPassword = !showPassword"
                        /> -->
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn id="login" color="ncb-yellow" @click="login">
                        Login
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                <v-tab-item :key="2">
                  <v-card>
                    <v-card-text>
                      <v-form>
                        <v-text-field
                          label="Account"
                          name="account"
                          prepend-icon="person"
                          type="text"
                          v-model="reset.account"
                        />

                        <v-text-field
                          id="current_password"
                          label="Current Password"
                          name="current_password"
                          prepend-icon="lock"
                          v-model="reset.currentPassword"
                          :type="showCurrentPassword ? 'text' : 'password'"
                          :append-icon="showCurrentPassword ?
                          'visibility' : 'visibility_off'"
                          @click:append="
                          showCurrentPassword = !showCurrentPassword"
                        />

                        <v-text-field
                          id="new_password"
                          label="New Password"
                          name="new_password"
                          prepend-icon="lock"
                          v-model="reset.newPassword"
                          :type="showNewPassword ? 'text' : 'password'"
                          :append-icon="showNewPassword ?
                          'visibility' : 'visibility_off'"
                          @click:append="showNewPassword = !showNewPassword"
                        />

                        <v-text-field
                          id="confirm_new_password"
                          label="Confirm"
                          name="confirm_new_password"
                          prepend-icon="lock"
                          v-model="reset.confirmNewPassword"
                          :type="showconfirmNewPassword ? 'text' : 'password'"
                          :append-icon="showconfirmNewPassword ?
                          'visibility' : 'visibility_off'"
                          @click:append="
                          showconfirmNewPassword = !showconfirmNewPassword"
                        />
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn
                        id="login"
                        color="ncb-yellow"
                        @click="resetPassword"
                      >
                        Reset
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
      showPassword: false,
      showCurrentPassword: false,
      showNewPassword: false,
      showconfirmNewPassword: false,
      dialog: {
        resetPassword: false,
        resetSuccess: false,
      },
      login: {
        account: '',
        password: '',
      },
      reset: {
        account: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
    };
  },
  props: {},
  methods: {
    async resetPassword(event) {
      if (this.newPassword !== this.confirmNewPassword) {
        return;
      }
      this.dialog.resetPassword = true;
      await this.$store
          .dispatch('Auth/changePassword', {
            account: this.reset.account,
            currentPassword: this.reset.currentPassword,
            newPassword: this.reset.newPassword,
          })
          .then(
              (result) => {
                setTimeout(() => {
                  this.dialog.resetPassword = false;
                  this.dialog.resetSuccess = true;
                }, 1000);
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
