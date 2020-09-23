import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

export const state = {
  alert: {
    open: false,
    timeout: "-1",
    description: "",
    status: "",
  },
  loading: {
    active: false,
    indeterminate: true,
  },
};

export const mutations = {
  SET_ALERT(state, data) {
    state.alert = data;
  },
  SET_LOADIG(state, value) {
    state.loading.active = value;
    state.loading.indeterminate = value;
  },
};

export default new Vuex.Store({
  modules,
  state,
  mutations,
});
