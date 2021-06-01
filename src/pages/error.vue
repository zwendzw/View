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
                解鎖失敗!
              </v-card-title>
              <v-card-text class="text-center">
                <svg class="bi bi-emoji-dizzy" width="5em" height="5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0
                    1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path fill-rule="evenodd"
                d="M9.146 5.146a.5.5 0 0 1
                  .708 0l.646.647.646-.647a.5.5 0 0 1
                  .708.708l-.647.646.647.646a.5.5 0 0
                  1-.708.708l-.646-.647-.646.647a.5.5 0 1
                  1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1
                  0-.708zm-5 0a.5.5 0 0 1
                  .708 0l.646.647.646-.647a.5.5 0 1 1
                  .708.708l-.647.646.647.646a.5.5 0 1
                  1-.708.708L5.5 7.207l-.646.647a.5.5 0 1
                  1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708z"/>
                <path d="M10 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
              </svg>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  created() {
    this.goHome();
  },
  methods: {
    goHome() {
      setTimeout(() => {
        this.$router.replace({
          name: 'user',
        });
      }, 5000);
    },
  },
};
</script>
