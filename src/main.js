import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { interceptor, interceptorTest } from "./helpers/interception";
import axios from "axios";
import VueMask from 'v-mask';

Vue.use(VueMask);
Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_URL;

interceptor();
interceptorTest();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
