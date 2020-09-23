<template>
  <v-app>
    <v-container>
      <v-dialog v-model="loading.active" hide-overlay persistent width="300">
        <v-card color="dark" dark>
          <v-card-text>
            loading...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <router-view />
      <v-snackbar
        v-model="alert.open"
        :color="alert.status"
        :timeout="alert.timeout"
      >
        {{ alert.description }}
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "App",
  data: () => ({
    rota: "",
    snackbar: true,
  }),
  created() {
    this.rota = this.$router.history.pending.name;
  },
  computed: {
    alert() {
      return this.$store.state.alert;
    },
    loading() {
      return this.$store.state.loading;
    },
    ...mapState({
      /*  loading: ({ kanban }) => kanban.loading, */
    }),
  },
  mounted() {
    this.$nextTick(() => {
      console.log(process.env.VUE_APP_URL);
      console.log(axios.defaults.baseURL);
    });
  },
};
</script>
