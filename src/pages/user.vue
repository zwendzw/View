<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
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
      dialog: {
        processingBar: false,
        errorDialog: false,
        errorMessage: '',
      },
      apply: {
        account: '',
      },
    };
  },
  methods: {
    applyForOtp(event) {
      this.$store.dispatch('ApplyForOtp/apply', {
        account: this.apply.account,
      }).then((result) => {
        console.log('result', result);
        // this.$router.replace({
        //   name: 'unlock',
        // });
      });
    },
  },
};
</script>
